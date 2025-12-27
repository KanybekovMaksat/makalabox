import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
} from '@blocknote/react';
import { CodeButton } from '../code-toolbar';
import { BlueButton } from '../BlueButton';

export const CustomToolbar = () => (
  <FormattingToolbarController
    formattingToolbar={() => (
      <FormattingToolbar>
        <BlockTypeSelect key="blockTypeSelect" />
        <FileCaptionButton key="fileCaptionButton" />
        <FileReplaceButton key="replaceFileButton" />
        <BasicTextStyleButton basicTextStyle="bold" key="boldStyleButton" />
        <BasicTextStyleButton basicTextStyle="italic" key="italicStyleButton" />
        <BasicTextStyleButton
          basicTextStyle="underline"
          key="underlineStyleButton"
        />
        <BasicTextStyleButton basicTextStyle="strike" key="strikeStyleButton" />
        <BlueButton key={'customButton'} />
        <TextAlignButton textAlignment="left" key="textAlignLeftButton" />
        <TextAlignButton textAlignment="center" key="textAlignCenterButton" />
        <TextAlignButton textAlignment="right" key="textAlignRightButton" />
        <ColorStyleButton key="colorStyleButton" />
        <NestBlockButton key="nestBlockButton" />
        <UnnestBlockButton key="unnestBlockButton" />
        <CreateLinkButton key="createLinkButton" />
      </FormattingToolbar>
    )}
  />
);
