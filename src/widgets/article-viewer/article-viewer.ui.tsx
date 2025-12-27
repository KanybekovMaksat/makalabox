import React, { useEffect, useMemo, useReducer } from 'react';
import {
  BlockNoteSchema,
  withPageBreak,
  BlockNoteEditor,
  createCodeBlockSpec,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import * as locales from '@blocknote/core/locales';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import {
  withMultiColumn,
  locales as multiColumnLocales,
} from '@blocknote/xl-multi-column';
import {
  PDFExporter,
  pdfDefaultSchemaMappings,
} from '@blocknote/xl-pdf-exporter';
import {
  pdf,
  Document,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';
import { codeBlockOptions } from '@blocknote/code-block';
import { Button } from '@mui/material';
import {
  docxDefaultSchemaMappings,
  DOCXExporter,
} from '@blocknote/xl-docx-exporter';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadingIcon from '@mui/icons-material/Downloading';
import ArticleIcon from '@mui/icons-material/Article';

type ArticleViewerProps = {
  body: any;
  title:string
};

const styles = StyleSheet.create({
  contentWrapper: {
    width: '85%', 
    margin: '2% auto', 
  },
  watermarkContainer: {
    position: 'absolute',
    right: 10,
    left: 10,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    fontSize: 12,
    opacity: 0.4,
    color: 'black',
  },
  watermarkText: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    fontSize: 12,
    opacity: 0.4,
    color: 'black',
  },
});

export function ArticleViewer({ body, title }: ArticleViewerProps) {
  const [renders, forceRerender] = useReducer((s) => s + 1, 0);

  const schema = useMemo(() => {
    return withMultiColumn(withPageBreak(BlockNoteSchema.create()));
  }, []);

  const editor = useMemo(() => {
    return BlockNoteEditor.create({
      initialContent: body ?? [],
      schema: BlockNoteSchema.create().extend({
        blockSpecs: {
          codeBlock: createCodeBlockSpec(codeBlockOptions),
        },
      }),
      dictionary: {
        ...locales.ru,
        multi_column: multiColumnLocales.ru,
      },
      tables: {
        splitCells: true,
        cellBackgroundColor: true,
        cellTextColor: true,
        headers: true,
      },
    });
  }, [body, schema]);

  const onChange = async () => {
    if (!editor) return;
    forceRerender();
  };

  useEffect(() => {
    onChange();
  }, [editor]);


  const createPdfDocument = async () => {
    const exporter = new PDFExporter(editor.schema, pdfDefaultSchemaMappings);
    const originalPdfDoc = await exporter.toReactPDFDocument(editor.document);

    const pages = originalPdfDoc.props.children;
    const pagesWithWatermark = React.Children.map(pages, (page, index) => {
      const pageNumber = index + 1;
      if (React.isValidElement(page)) {
        const originalContent = page.props.children;
        return React.cloneElement(
          page,
          page.props,
          <>
            <View style={styles.contentWrapper}>{originalContent}</View>
            <Text style={styles.pageNumber} fixed>
              makalabox.com
            </Text>
            {/* <Text style={styles.pageNumber} fixed>
              {index + 1}
            </Text> */}
          </>
        );
      }
      return page;
    });

    return <Document>{pagesWithWatermark}</Document>;
  };

  const handlePdfDownload = async () => {
    if (!editor) return;

    const pdfDoc = await createPdfDocument();

    const blob = await pdf(pdfDoc).toBlob();
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = title + '.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };


  const handleDocxDownload = async () => {
    if (!editor) return;
    const exporter = new DOCXExporter(editor.schema, docxDefaultSchemaMappings);
    const blob = await exporter.toBlob(editor.document);
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = title + '.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='min-w-full'>
      <BlockNoteView
        formattingToolbar={false}
        editable={false}
        slashMenu={false}
        theme={'light'}
        data-changing-font-demo
        editor={editor}
        onChange={onChange}
      ></BlockNoteView>
      <div className="flex gap-2">
        <Button
          size="small"
          className="shadow-none bg-[#e74c3c]  flex items-center gap-1"
          startIcon={<DownloadingIcon />}
          variant="contained"
          onClick={handlePdfDownload}
        >
          <PictureAsPdfIcon />
        </Button>
        <Button
          size="small"
          variant="contained"
          className="shadow-none lowercase"
          startIcon={<DownloadingIcon />}
          onClick={handleDocxDownload}
        >
          <div className="flex">
            <ArticleIcon />
            <p className="mt-1">.docx</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
