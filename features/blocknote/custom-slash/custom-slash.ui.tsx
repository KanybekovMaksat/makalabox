import {
  DefaultReactSuggestionItem,
  SuggestionMenuProps,
} from '@blocknote/react';
import { useEffect, useRef } from 'react';

function getTranslatedText(title: string): string {
  switch (title) {
    case 'Heading 1':
      return 'Заголовок 1';
    case 'Heading 2':
      return 'Заголовок 2';
    case 'Heading 3':
      return 'Заголовок 3';
    case 'Numbered List':
      return 'Нумерованный список';
    case 'Bullet List':
      return 'Маркированный список';
    case 'Paragraph':
      return 'Параграф';
    case 'Table':
      return 'Таблица';
    case 'Image':
      return 'Изображение';
    case 'Video':
      return 'Видео';
    default:
      return title;
  }
}

export function CustomSlashMenu(
  props: SuggestionMenuProps<DefaultReactSuggestionItem>
) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.selectedIndex !== undefined && menuRef.current) {
      const selectedElement = menuRef.current.childNodes[
        props.selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [props.selectedIndex]);

  const filteredItems = props.items.filter((item) => {
    const unwantedTitles = ['Audio', 'File', 'Check List'];
    return !unwantedTitles.includes(item.title);
  });

  return (
    <div className="slash-menu bg-none max-h-48 overflow-y-auto" ref={menuRef}>
      {filteredItems.map((item, index) => (
        <div
          key={index}
          className={`slash-menu-item border-b border-b-second-100/40 p-3 ${
            props.selectedIndex === index ? 'selected bg-second-100/40' : ''
          }`}
          onClick={() => {
            props.onItemClick?.(item);
          }}
        >
          <div className="flex items-center gap-2">
            <div className="bg-second-100 p-1 rounded slash-icon text-[white]">
              {item.icon}
            </div>
            <div className="text-md text-sm font-medium font-serif">
              {getTranslatedText(item.title)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
