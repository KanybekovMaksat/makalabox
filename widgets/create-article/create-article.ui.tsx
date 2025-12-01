// import {
//   Block,
//   BlockNoteEditor,
//   BlockNoteSchema,
//   PartialBlock,
//   combineByGroup,
//   createCodeBlockSpec,
//   filterSuggestionItems,
//   withPageBreak,
// } from '@blocknote/core';
// import '@blocknote/core/fonts/inter.css';
// import * as locales from '@blocknote/core/locales';
// import { BlockNoteView } from '@blocknote/mantine';
// import '@blocknote/mantine/style.css';
// import {
//   SideMenu,
//   SideMenuController,
//   SuggestionMenuController,
//   getDefaultReactSlashMenuItems,
//   getPageBreakReactSlashMenuItems,
// } from '@blocknote/react';
// import {
//   getMultiColumnSlashMenuItems,
//   multiColumnDropCursor,
//   locales as multiColumnLocales,
//   withMultiColumn,
// } from '@blocknote/xl-multi-column';
// import {
//   PDFExporter,
//   pdfDefaultSchemaMappings,
// } from '@blocknote/xl-pdf-exporter';
// import {
//   pdf,
//   Document,
//   Page,
//   View,
//   Text,
//   StyleSheet,
// } from '@react-pdf/renderer';
// import {
//   DOCXExporter,
//   docxDefaultSchemaMappings,
// } from '@blocknote/xl-docx-exporter';
// import React, { useEffect, useMemo, useState } from 'react';
// import { Button } from '@mui/material';
// import { codeBlockOptions } from '@blocknote/code-block';
// import DownloadingIcon from '@mui/icons-material/Downloading';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { styled, alpha } from '@mui/material/styles';
// import Menu, { MenuProps } from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import { CustomToolbar } from '@/features/blocknote/custom-toolbar';

// const styles = StyleSheet.create({
//   contentWrapper: {
//     width: '85%',
//     margin: '2% auto',
//   },
//   watermarkText: {
//     position: 'absolute',
//     bottom: 10,
//     right: 20,
//     fontSize: 12,
//     opacity: 0.4,
//     color: 'black',
//   },
// });

// const StyledMenu = styled((props: MenuProps) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   '& .MuiPaper-root': {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color: 'rgb(55, 65, 81)',
//     boxShadow:
//       'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//     '& .MuiMenu-list': {
//       padding: '4px 0',
//     },
//     '& .MuiMenuItem-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//         ...theme.applyStyles('dark', {
//           color: 'inherit',
//         }),
//       },
//       '&:active': {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity
//         ),
//       },
//     },
//     ...theme.applyStyles('dark', {
//       color: theme.palette.grey[300],
//     }),
//   },
// }));

// async function saveToStorage(doc: Block[]) {
//   localStorage.setItem('editorContent', JSON.stringify(doc));
// }

// async function loadFromStorage(): Promise<PartialBlock[] | undefined> {
//   const raw = localStorage.getItem('editorContent');
//   if (!raw) return undefined;

//   try {
//     return JSON.parse(raw) as PartialBlock[];
//   } catch {
//     console.warn('Ошибка чтения localStorage');
//     return undefined;
//   }
// }
// interface CreateArticleProps {
//   onTitleChange: (title: string) => void;
// }

// export function CreateArticle({ onTitleChange }: CreateArticleProps) {
//   const [initialContent, setInitialContent] = useState<
//     PartialBlock[] | undefined | 'loading'
//   >('loading');
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const ARTICLE_TITLE_BLOCK: PartialBlock = {
//     id: 'article-title',
//     type: 'heading',
//     props: { level: 1 },
//     content: 'Заголовок статьи',
//   };

//   // async function uploadFile(file: File) {
//   //   const body = new FormData();
//   //   body.append('file', file);
//   //   try {
//   //     console.log(file);
//   //     const response = await $api.post('articles/file-upload/', body);
//   //     return response.data.file;
//   //   } catch (error) {
//   //     console.error('Error uploading file:', error);
//   //     throw new Error('File upload failed');
//   //   }
//   // }

//   useEffect(() => {
//     loadFromStorage().then((loaded) => {
//       let merged: PartialBlock[];
//       const hasTitle = loaded?.some((b) => b.id === 'article-title');

//       if (hasTitle) {
//         merged = [...loaded!];
//       } else {
//         merged = [ARTICLE_TITLE_BLOCK, ...(loaded ?? [])];
//       }

//       setInitialContent(merged);
//     });
//   }, []);

//   const schema = useMemo(() => {
//     return withMultiColumn(withPageBreak(BlockNoteSchema.create()));
//   }, []);

//   const editor = useMemo(() => {
//     if (initialContent === 'loading') return undefined;

//     return BlockNoteEditor.create({
//       initialContent: initialContent ?? [],
//       schema: BlockNoteSchema.create().extend({
//         blockSpecs: {
//           codeBlock: createCodeBlockSpec(codeBlockOptions),
//         },
//       }),
//       dropCursor: multiColumnDropCursor,
//       dictionary: {
//         ...locales.ru,
//         multi_column: multiColumnLocales.ru,
//       },
//       tables: {
//         splitCells: true,
//         cellBackgroundColor: true,
//         cellTextColor: true,
//         headers: true,
//       },
//       // uploadFile,
//     });
//   }, [initialContent, schema]);
//   useEffect(() => {
//     if (!editor) return;

//     const unsub = editor.onChange(() => {
//       const blocks = editor.document;
//       const title = blocks.find((b) => b.id === 'article-title');
//       const titleBlock = blocks.find((b) => b.id === 'article-title');
//       if (!title) {
//         editor.insertBlocks([ARTICLE_TITLE_BLOCK], 0);
//         return;
//       }

//       if (blocks[0]?.id !== 'article-title') {
//         editor.removeBlocks([title]);
//         editor.insertBlocks([title], 0);
//       }
//       if (titleBlock.content && Array.isArray(titleBlock.content)) {
//         // Контент может быть массивом Text, Link и т_д.
//         // Мы предполагаем, что заголовок - это просто текст.
//         const titleText = titleBlock.content
//           .map((item: any) => item.text || '')
//           .join('');
//         onTitleChange(titleText.trim()); // Передаем заголовок родителю
//       } else if (typeof titleBlock.content === 'string') {
//         onTitleChange(titleBlock.content.trim());
//       } else {
//         onTitleChange('');
//       }

//       if (title.type !== 'heading' || title.props?.level !== 1) {
//         editor.updateBlock(title, { type: 'heading', props: { level: 1 } });
//       }
//     });

//     return () => unsub();
//   }, [editor, onTitleChange]);

//   const getSlashMenuItems = useMemo(() => {
//     if (!editor) return undefined;

//     return async (query: string) => {
//       const items = combineByGroup(
//         getDefaultReactSlashMenuItems(editor),
//         getPageBreakReactSlashMenuItems(editor),
//         getMultiColumnSlashMenuItems(editor)
//       );

//       return filterSuggestionItems(items, query);
//     };
//   }, [editor]);

//   const createPdfDocument = async () => {
//     const exporter = new PDFExporter(editor!.schema, pdfDefaultSchemaMappings);
//     const originalPdfDoc = await exporter.toReactPDFDocument(editor!.document);

//     const pages = originalPdfDoc.props.children;
//     const pagesWithWatermark = React.Children.map(pages, (page, index) => {
//       if (React.isValidElement(page) && page.type === Page) {
//         const originalContent = page.props.children;
//         return React.cloneElement(
//           page,
//           page.props,
//           <>
//             <View style={styles.contentWrapper}>{originalContent}</View>
//             <Text style={styles.watermarkText} fixed>
//               makalabox.com
//             </Text>
//           </>
//         );
//       }
//       return page;
//     });

//     return <Document>{pagesWithWatermark}</Document>;
//   };

//   const handlePdfPreview = async () => {
//     if (!editor) return;

//     const pdfDoc = await createPdfDocument();

//     const blob = await pdf(pdfDoc).toBlob();
//     const url = URL.createObjectURL(blob);
//     window.open(url);
//     setAnchorEl(null);
//   };

//   const handlePdfDownload = async () => {
//     if (!editor) return;

//     const pdfDoc = await createPdfDocument();

//     const blob = await pdf(pdfDoc).toBlob();

//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.href = url;
//     link.download = 'makala.pdf';
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     URL.revokeObjectURL(url);
//     setAnchorEl(null);
//   };

//   const handleDocxDownload = async () => {
//     if (!editor) return;

//     const exporter = new DOCXExporter(editor.schema, docxDefaultSchemaMappings);
//     const blob = await exporter.toBlob(editor.document);

//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.href = url;
//     link.download = 'makala.docx';
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     URL.revokeObjectURL(url);
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       {!editor && <div>Loading content...</div>}

//       {editor && (
//         <BlockNoteView
//           data-changing-font-demo
//           editor={editor}
//           theme="light"
//           sideMenu={false}
//           slashMenu={false}
//           onChange={() => {
//             saveToStorage(editor.document);
//           }}
//         >
//           <SideMenuController
//             sideMenu={(props) => {
//               const isTitle = props.block.id === 'article-title';
//               return <SideMenu {...props}>{isTitle && <></>}</SideMenu>;
//             }}
//           />
//           <CustomToolbar />
//           {getSlashMenuItems && (
//             <SuggestionMenuController
//               triggerCharacter={'/'}
//               getItems={getSlashMenuItems}
//             />
//           )}
//         </BlockNoteView>
//       )}

//       <div>
//         <Button
//           id="demo-customized-button"
//           aria-controls={open ? 'demo-customized-menu' : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? 'true' : undefined}
//           disableElevation
//           variant="contained"
//           size="small"
//           className=" bg-pc-400 mt-5 my-2"
//           onClick={handleClick}
//           endIcon={<KeyboardArrowDownIcon />}
//         >
//           Файл
//         </Button>
//         <StyledMenu
//           id="demo-customized-menu"
//           slotProps={{
//             list: {
//               'aria-labelledby': 'demo-customized-button',
//             },
//           }}
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handlePdfPreview} disableRipple>
//             <VisibilityIcon />
//             Предпросмотр
//           </MenuItem>
//           <MenuItem onClick={handlePdfDownload} disableRipple>
//             <DownloadingIcon />
//             Скачать .pdf
//           </MenuItem>
//           <MenuItem onClick={handleDocxDownload} disableRipple>
//             <DownloadingIcon />
//             Скачать .docx
//           </MenuItem>
//         </StyledMenu>
//       </div>
//     </div>
//   );
// }
import {
  Block,
  BlockNoteEditor,
  BlockNoteSchema,
  PartialBlock,
  combineByGroup,
  createCodeBlockSpec,
  filterSuggestionItems,
  withPageBreak,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import * as locales from '@blocknote/core/locales';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import {
  SideMenu,
  SideMenuController,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  getPageBreakReactSlashMenuItems,
} from '@blocknote/react';
import {
  getMultiColumnSlashMenuItems,
  multiColumnDropCursor,
  locales as multiColumnLocales,
  withMultiColumn,
} from '@blocknote/xl-multi-column';
import {
  PDFExporter,
  pdfDefaultSchemaMappings,
} from '@blocknote/xl-pdf-exporter';
import {
  pdf,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from '@react-pdf/renderer';
import {
  DOCXExporter,
  docxDefaultSchemaMappings,
} from '@blocknote/xl-docx-exporter';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@heroui/button';
import { codeBlockOptions } from '@blocknote/code-block';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@heroui/dropdown';
import { CustomToolbar } from '@/features/blocknote/custom-toolbar';
import { Eye, File, Download } from 'lucide-react';

const styles = StyleSheet.create({
  contentWrapper: {
    width: '85%',
    margin: '2% auto',
  },
  watermarkText: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    fontSize: 12,
    opacity: 0.4,
    color: 'black',
  },
});

async function saveToStorage(doc: Block[]) {
  localStorage.setItem('editorContent', JSON.stringify(doc));
}

async function loadFromStorage(): Promise<PartialBlock[] | undefined> {
  const raw = localStorage.getItem('editorContent');
  if (!raw) return undefined;

  try {
    return JSON.parse(raw) as PartialBlock[];
  } catch {
    console.warn('Ошибка чтения localStorage');
    return undefined;
  }
}

interface CreateArticleProps {
  onTitleChange: (title: string) => void;
}

export function CreateArticle({ onTitleChange }: CreateArticleProps) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');
  const [isOpen, setIsOpen] = useState(false);

  const ARTICLE_TITLE_BLOCK: PartialBlock = {
    id: 'article-title',
    type: 'heading',
    props: { level: 1 },
    content: 'Заголовок статьи',
  };

  useEffect(() => {
    loadFromStorage().then((loaded) => {
      let merged: PartialBlock[];
      const hasTitle = loaded?.some((b) => b.id === 'article-title');

      if (hasTitle) {
        merged = [...loaded!];
      } else {
        merged = [ARTICLE_TITLE_BLOCK, ...(loaded ?? [])];
      }

      setInitialContent(merged);
    });
  }, []);

  const schema = useMemo(() => {
    return withMultiColumn(withPageBreak(BlockNoteSchema.create()));
  }, []);

  const editor = useMemo(() => {
    if (initialContent === 'loading') return undefined;

    return BlockNoteEditor.create({
      initialContent: initialContent ?? [],
      schema: BlockNoteSchema.create().extend({
        blockSpecs: {
          codeBlock: createCodeBlockSpec(codeBlockOptions),
        },
      }),
      dropCursor: multiColumnDropCursor,
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
      // uploadFile,
    });
  }, [initialContent, schema]);

  useEffect(() => {
    if (!editor) return;

    const unsub = editor.onChange(() => {
      const blocks = editor.document;
      const title = blocks.find((b) => b.id === 'article-title');
      const titleBlock = blocks.find((b) => b.id === 'article-title');
      if (!title) {
        editor.insertBlocks([ARTICLE_TITLE_BLOCK], 0);
        return;
      }

      if (blocks[0]?.id !== 'article-title') {
        editor.removeBlocks([title]);
        editor.insertBlocks([title], 0);
      }
      if (titleBlock.content && Array.isArray(titleBlock.content)) {
        const titleText = titleBlock.content
          .map((item: any) => item.text || '')
          .join('');
        onTitleChange(titleText.trim());
      } else if (typeof titleBlock.content === 'string') {
        onTitleChange(titleBlock.content.trim());
      } else {
        onTitleChange('');
      }

      if (title.type !== 'heading' || title.props?.level !== 1) {
        editor.updateBlock(title, { type: 'heading', props: { level: 1 } });
      }
    });

    return () => unsub();
  }, [editor, onTitleChange]);

  const getSlashMenuItems = useMemo(() => {
    if (!editor) return undefined;

    return async (query: string) => {
      const items = combineByGroup(
        getDefaultReactSlashMenuItems(editor),
        getPageBreakReactSlashMenuItems(editor),
        getMultiColumnSlashMenuItems(editor)
      );

      return filterSuggestionItems(items, query);
    };
  }, [editor]);

  const createPdfDocument = async () => {
    const exporter = new PDFExporter(editor!.schema, pdfDefaultSchemaMappings);
    const originalPdfDoc = await exporter.toReactPDFDocument(editor!.document);

    const pages = originalPdfDoc.props.children;
    const pagesWithWatermark = React.Children.map(pages, (page, index) => {
      if (React.isValidElement(page) && page.type === Page) {
        const originalContent = page.props.children;
        return React.cloneElement(
          page,
          page.props,
          <>
            <View style={styles.contentWrapper}>{originalContent}</View>
            <Text style={styles.watermarkText} fixed>
              makalabox.com
            </Text>
          </>
        );
      }
      return page;
    });

    return <Document>{pagesWithWatermark}</Document>;
  };

  const handlePdfPreview = async () => {
    if (!editor) return;

    const pdfDoc = await createPdfDocument();
    const blob = await pdf(pdfDoc).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url);
    setIsOpen(false);
  };

  const handlePdfDownload = async () => {
    if (!editor) return;

    const pdfDoc = await createPdfDocument();
    const blob = await pdf(pdfDoc).toBlob();

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'makala.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleDocxDownload = async () => {
    if (!editor) return;

    const exporter = new DOCXExporter(editor.schema, docxDefaultSchemaMappings);
    const blob = await exporter.toBlob(editor.document);

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'makala.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  return (
    <div>
      {!editor && <div>Loading content...</div>}

      {editor && (
        <BlockNoteView
          data-changing-font-demo
          editor={editor}
          sideMenu={false}
          slashMenu={false}
          onChange={() => {
            saveToStorage(editor.document);
          }}
        >
          <SideMenuController
            sideMenu={(props) => {
              const isTitle = props.block.id === 'article-title';
              return <SideMenu {...props}>{isTitle && <></>}</SideMenu>;
            }}
          />
          <CustomToolbar />
          {getSlashMenuItems && (
            <SuggestionMenuController
              triggerCharacter={'/'}
              getItems={getSlashMenuItems}
            />
          )}
        </BlockNoteView>
      )}

      <div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              size="sm"
              className="bg-primary-400 mt-5 my-2 text-white"
            >
              <File className="w-4 h-4 mr-2" />
              Файл
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="File actions" className="min-w-40">
            <DropdownItem
              key="preview"
              onPress={handlePdfPreview}
              startContent={<Eye className="w-4 h-4" />}
            >
              Предпросмотр
            </DropdownItem>
            <DropdownItem
              key="pdf"
              onPress={handlePdfDownload}
              startContent={<Download className="w-4 h-4" />}
            >
              Скачать .pdf
            </DropdownItem>
            <DropdownItem
              key="docx"
              onPress={handleDocxDownload}
              startContent={<Download className="w-4 h-4" />}
            >
              Скачать .docx
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
