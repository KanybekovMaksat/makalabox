// import $api from '~shared/api';
// import {
//   Block,
//   BlockNoteEditor,
//   BlockNoteSchema,
//   PartialBlock,
//   defaultBlockSpecs,
//   defaultStyleSpecs,
//   filterSuggestionItems,
//   insertOrUpdateBlock,
// } from '@blocknote/core';
// import '@blocknote/core/fonts/inter.css';
// import {
//   SuggestionMenuController,
//   getDefaultReactSlashMenuItems,
// } from '@blocknote/react';
// import '@blocknote/react/style.css';
// import { CodeBlock, insertCode } from '@defensestation/blocknote-code';
// import { AlertBlock } from '~features/blocknote/alert-block';
// import { RiAlertFill } from 'react-icons/ri';
// import { CustomSlashMenu } from '~features/blocknote/custom-slash';
// import { codeStyleSpec } from './../../features/blocknote/code-toolbar/code-toolbar.stylespec';
// import { CustomToolbar } from '~features/blocknote/custom-toolbar';
// import { useEffect, useMemo, useState } from 'react';
// import { CircularProgress } from '@mui/material';
// import { BlockNoteView } from '@blocknote/mantine';
// import { YouTubeBlock } from '~features/blocknote/youtube-block';
// import { RiYoutubeFill } from 'react-icons/ri';

// const schema = BlockNoteSchema.create({
//   blockSpecs: {
//     ...defaultBlockSpecs,
//     youtube: YouTubeBlock,
//     alert: AlertBlock,
//     procode: CodeBlock,
//   },
//   styleSpecs: {
//     ...defaultStyleSpecs,
//     code: codeStyleSpec,
//   },
// });

// const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
//   title: 'Заметки',
//   onItemClick: () => {
//     insertOrUpdateBlock(editor, {
//       type: 'alert',
//     });
//   },
//   aliases: ['alert', 'notification', 'info', 'note'],
//   group: 'Advanced',
//   icon: <RiAlertFill />,
// });

// const insertYouTubeVideo = (editor: typeof schema.BlockNoteEditor) => ({
//   title: 'YouTube Видео',
//   onItemClick: () => {
//     insertOrUpdateBlock(editor, {
//       type: 'youtube',
//       props: {
//         url: '',
//       },
//     });
//   },
//   aliases: ['youtube', 'video', 'embed', 'media'],
//   group: 'Advanced',
//   icon: <RiYoutubeFill />,
// });

// async function uploadFile(file: File) {
//   const body = new FormData();
//   body.append('image', file);
//   try {
//     const response = await $api.post('articles/file-upload/', body);
//     return response.data.image;
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw new Error('File upload failed');
//   }
// }

// type EditArticleProps = {
//   id: number;
//   body: any;
// };

// export function EditArticle(props: EditArticleProps) {
//   const saveToStorage = async (jsonBlocks: Block[]) => {
//     localStorage.setItem(`editContent-${props.id}`, JSON.stringify(jsonBlocks));
//   };

//   const loadFromStorage = async () => {
//     const storageString = localStorage.getItem(`editContent-${props.id}`);
//     return storageString
//       ? (JSON.parse(storageString) as PartialBlock[])
//       : undefined;
//   };

//   const [initialContent, setInitialContent] = useState<
//     PartialBlock[] | 'loading'
//   >('loading');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchInitialContent = async () => {
//       const storedContent = await loadFromStorage();
//       setInitialContent(storedContent || props.body);
//       setIsLoading(false);
//     };

//     fetchInitialContent();
//   }, [props.id, props.body]);

//   const editor = useMemo(() => {
//     if (initialContent === 'loading') return undefined;
//     return BlockNoteEditor.create({ schema, initialContent, uploadFile });
//   }, [initialContent]);

//   if (editor === undefined) {
//     return 'Loading content...';
//   }

//   return isLoading ? (
//     <div className="flex flex-col items-center gap-3 my-20">
//       <CircularProgress />
//       Загрузка...
//     </div>
//   ) : (
//     <BlockNoteView
//       data-changing-font-demo
//       slashMenu={false}
//       editor={editor}
//       theme={'light'}
//       formattingToolbar={false}
//       onChange={() => saveToStorage(editor.document)}
//     >
//       <CustomToolbar />
//       <SuggestionMenuController
//         triggerCharacter={'/'}
//         suggestionMenuComponent={CustomSlashMenu}
//         getItems={async (query: string) =>
//           filterSuggestionItems(
//             [
//               ...getDefaultReactSlashMenuItems(editor),
//               insertYouTubeVideo(editor),
//               insertAlert(editor),
//               insertCode(),
//             ],
//             query
//           )
//         }
//       />
//     </BlockNoteView>
//   );
// }
import $api from '~shared/api';
import {
  Block,
  BlockNoteEditor,
  BlockNoteSchema,
  PartialBlock,
  defaultBlockSpecs,
  defaultStyleSpecs,
  filterSuggestionItems,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
} from '@blocknote/react';
import '@blocknote/react/style.css';
import { CustomSlashMenu } from '~features/blocknote/custom-slash';
import { CustomToolbar } from '~features/blocknote/custom-toolbar';
import { useEffect, useMemo, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { BlockNoteView } from '@blocknote/mantine';

const schema = BlockNoteSchema.create({
  blockSpecs: { ...defaultBlockSpecs },
  styleSpecs: { ...defaultStyleSpecs },
});

async function uploadFile(file: File) {
  const body = new FormData();
  body.append('image', file);
  try {
    const response = await $api.post('articles/file-upload/', body);
    return response.data.image;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('File upload failed');
  }
}

type EditArticleProps = {
  id: number;
  body: any;
};

export function EditArticle(props: EditArticleProps) {
  const saveToStorage = async (jsonBlocks: Block[]) => {
    localStorage.setItem(`editContent-${props.id}`, JSON.stringify(jsonBlocks));
  };

  const loadFromStorage = async () => {
    const storageString = localStorage.getItem(`editContent-${props.id}`);
    return storageString ? (JSON.parse(storageString) as PartialBlock[]) : undefined;
  };

  const [initialContent, setInitialContent] = useState<PartialBlock[] | 'loading'>('loading');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialContent = async () => {
      const storedContent = await loadFromStorage();
      setInitialContent(storedContent || props.body);
      setIsLoading(false);
    };
    fetchInitialContent();
  }, [props.id, props.body]);

  const editor = useMemo(() => {
    if (initialContent === 'loading') return undefined;
    return BlockNoteEditor.create({ schema, initialContent, uploadFile });
  }, [initialContent]);

  if (!editor) return <div>Loading content...</div>;

  return isLoading ? (
    <div className="flex flex-col items-center gap-3 my-20">
      <CircularProgress />
      Загрузка...
    </div>
  ) : (
    <BlockNoteView
      data-changing-font-demo
      slashMenu={false}
      editor={editor}
      theme="light"
      formattingToolbar={false}
      onChange={() => saveToStorage(editor.document)}
    >
      <CustomToolbar />
      <SuggestionMenuController
        triggerCharacter="/"
        suggestionMenuComponent={CustomSlashMenu}
        getItems={async (query: string) => {
          if (!editor) return [];
          return filterSuggestionItems(getDefaultReactSlashMenuItems(editor), query);
        }}
      />
    </BlockNoteView>
  );
}
