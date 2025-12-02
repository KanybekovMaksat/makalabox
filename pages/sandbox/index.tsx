import { useState } from 'react';
import { CreateArticle } from '@/widgets/create-article';
import DefaultLayout from '@/layouts/default';
import { CategorySelect } from '@/features/editor/category-select';
import { CoverCropper } from '@/features/editor/cover-cropper';
import { articleQueries } from '@/entities/article';
import { Button } from '@heroui/button';

export default function Sandbox() {
  const { mutate: createArticle, isPending } =
    articleQueries.useCreateArticleMutation();
  const [title, setTitle] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [coverImage, setCoverImage] = useState('');
  const [coverPosition, setCoverPosition] = useState('center');
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <DefaultLayout>
<CoverCropper
  value={coverImage}
  onChange={(image, position) => {
    setCoverImage(image);
    if (position) setCoverPosition(position);
  }}
  initialPosition="center"
/>
      <CategorySelect
        selectCategory={selectedValues}
        handleChange={setSelectedValues}
      />
      <CreateArticle onTitleChange={handleTitleChange} />
      <Button>Опубликовать</Button>
    </DefaultLayout>
  );
}
