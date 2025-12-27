import { BlockSchema, InlineContentSchema, StyleSchema } from '@blocknote/core';
import {
  useBlockNoteEditor,
  useComponentsContext,
  useEditorContentOrSelectionChange,
  createReactStyleSpec,
} from '@blocknote/react';
import { useState } from 'react';
import { RiCodeFill } from 'react-icons/ri';

// 1. Спецификация стиля для кода
export const codeStyleSpec = createReactStyleSpec(
  {
    type: 'code',
    propSchema: 'string',
  },
  {
    render: (props) => (
      <span
        style={{
          background: '#1E1E1E',
          color: '#FFFFFF',
          fontFamily: 'monospace',
          padding: '2px 4px',
          borderRadius: '4px',
        }}
        ref={props.contentRef}
        className="code-toolbar"
      >
        {props.children}
      </span>
    ),
  }
);

// 2. Кнопка для панели инструментов
export function CodeButton() {
  const editor = useBlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>();
  const Components = useComponentsContext()!;

  const [isSelected, setIsSelected] = useState(
    editor.getActiveStyles().code === 'code'
  );

  useEditorContentOrSelectionChange(() => {
    setIsSelected(editor.getActiveStyles().code === 'code');
  }, editor);

  const toggleCodeStyle = () => {
    const currentStyles = editor.getActiveStyles();

    if (currentStyles.code === 'code') {
      editor.removeStyles({ code: '' });
      setIsSelected(false);
    } else {
      editor.addStyles({
        code: 'code', // ключ для применения styleSpec
      });
      setIsSelected(true);
    }
  };

  return (
    <Components.FormattingToolbar.Button
      label="Set code snippet"
      mainTooltip="Code"
      icon={<RiCodeFill />}
      onClick={toggleCodeStyle}
      isSelected={isSelected}
    />
  );
}
