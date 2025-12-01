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