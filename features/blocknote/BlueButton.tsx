import "@blocknote/mantine/style.css";
import {
  useBlockNoteEditor,
  useComponentsContext,
  useEditorContentOrSelectionChange,
  useSelectedBlocks,
} from "@blocknote/react";
import { useState } from "react";
import { RiCodeFill } from "react-icons/ri";

export function BlueButton() {
  const editor = useBlockNoteEditor();

  const Components = useComponentsContext()!;

  const [isSelected, setIsSelected] = useState<boolean>(
    editor.getActiveStyles().textColor === "blue" &&
      editor.getActiveStyles().backgroundColor === "blue",
  );

  useEditorContentOrSelectionChange(() => {
    setIsSelected(
      editor.getActiveStyles().textColor === "blue" &&
        editor.getActiveStyles().backgroundColor === "blue",
    );
  }, editor);


  const blocks = useSelectedBlocks();
  if (blocks.filter((block) => block.content !== undefined).length === 0) {
    return null;
  }

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={"Blue Text & Background"}
      onClick={() => {
        editor.toggleStyles({
          textColor: "blue",
          backgroundColor: "blue",
        });
      }}
      isSelected={isSelected}
    >
      <RiCodeFill />
    </Components.FormattingToolbar.Button>
  );
}
