import { createReactBlockSpec } from '@blocknote/react';
import { Menu, TextInput } from '@mantine/core';
import { useState } from 'react';
import { Button } from '@mui/material';

export const YouTubeBlock = createReactBlockSpec(
  {
    type: 'youtube',
    propSchema: {
      url: {
        default: '',
      },
    },
    content: 'inline',
  },
  {
    render: (props) => {
      const [url, setUrl] = useState(props.block.props.url);
      const [tempUrl, setTempUrl] = useState(url);
      const [menuOpened, setMenuOpened] = useState(false);

      const updateUrl = () => {
        props.editor.updateBlock(props.block, {
          type: 'youtube',
          props: { url: tempUrl },
        });
        setUrl(tempUrl);
        setMenuOpened(false);
      };

      const getYouTubeEmbedUrl = (url) => {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : '';
      };

      return (
        <div>
          {menuOpened && (
            <Menu
              withinPortal={false}
              opened={menuOpened}
              onClose={() => setMenuOpened(false)}
            >
              <Menu.Target>
                <div
                  contentEditable={false}
                  onClick={() => setMenuOpened((prev) => !prev)}
                ></div>
              </Menu.Target>
              <Menu.Dropdown className="min-w-[300px] flex flex-col p-3">
                <Menu.Label>Вставить ссылку</Menu.Label>
                <Menu.Divider />
                <TextInput
                  value={tempUrl}
                  className="border rounded"
                  onChange={(event) => setTempUrl(event.currentTarget.value)}
                />
                <Button
                  size="small"
                  className="shadow-none my-2"
                  variant="contained"
                  onClick={updateUrl}
                >
                  Подтвердить
                </Button>
              </Menu.Dropdown>
            </Menu>
          )}
          {url ? (
            <iframe
              width="100%"
              className="w-full h-[200px] md:h-[480px]"
              src={getYouTubeEmbedUrl(url)}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          ) : (
            <div
              className="flex flex-col items-center gap-2 p-5 text-[#888] bg-[#f9f9f9] border border-[#ddd]"
              contentEditable={false}
            >
              Введите ссылку на YouTube видео
              <Button
                variant="contained"
                className="shadow-none"
                onClick={() => setMenuOpened((prev) => !prev)}
              >
                Добавить ссылку
              </Button>
            </div>
          )}
          <div className="inline-content" ref={props.contentRef} />
        </div>
      );
    },
  }
);
