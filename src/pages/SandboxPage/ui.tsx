import { useState } from 'react';
import { CreateArticle } from '~widgets/create-article';
import { Container, Button } from '@mui/material';
import { userQueries } from '~entities/user';
import { pathKeys } from '~shared/lib/react-router';
import { useNavigate } from 'react-router-dom';
import { articleQueries } from '~entities/article';
import { CategorySelect } from '~features/editor/category-select';
import { CoverCropper } from '~features/editor/cover-cropper';
import { URLtoFile, calculateReadingTime } from '~shared/utils/editor';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from '~shared/ui/error';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function Page() {
  const { data: userData } = userQueries.useLoginUserQuery();
  const role = userData?.data?.role || '';
  const navigate = useNavigate();

  if (role === 'reader') {
    navigate(pathKeys.home());
  }
  const { mutate: createArticle, isPending } =
    articleQueries.useCreateArticleMutation();

  const [title, setTitle] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = async () => {
    try {
      const blocksString = localStorage.getItem('editorContent');
      const blocks = blocksString ? JSON.parse(blocksString) : [];

      const firstParagraph = blocks.find(
        (b: any) =>
          b.type === 'paragraph' &&
          b.content &&
          b.content.length > 0 &&
          b.content[0].text
      );
      const trimmedSubtitle = firstParagraph
        ? firstParagraph.content[0].text.substring(0, 250)
        : '';

      const imageBlob = localStorage.getItem('savedImage');
      const file = await URLtoFile(imageBlob, imageBlob);

      const formData = new FormData();
      formData.append('photo', file);
      formData.append('title', title);
      formData.append('subtitle', trimmedSubtitle);
      formData.append('body', JSON.stringify(blocks));
      formData.append('status', status);
      formData.append('organization', 9);
      formData.append('readTime', calculateReadingTime(blocks).toString());
      selectedValues.forEach((value) => formData.append('categories', value));

      await createArticle(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    console.log(newTitle);
    
  };
  return (
    <>
      <Container maxWidth="md" className="min-h-[700px] my-10">
        <div className="w-full my-5 flex flex-col bg-[white] border border-sc-100 p-3 md:p-5 rounded">
          <CoverCropper update={false} />
          <CategorySelect
            selectCategory={selectedValues}
            handleChange={setSelectedValues}
          />
          <CreateArticle onTitleChange={handleTitleChange} />
          <Button
            variant="contained"
            size="small"
            className="shadow-none flex gap-2 rounded-full w-40 bg-second-100"
            onClick={handleSubmit}
          >
            <CloudUploadIcon/>
            Опубликовать
          </Button>
        </div>
      </Container>
    </>
  );
}

export const SandboxPage = withErrorBoundary(Page, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
