import { useState } from 'react';
import { useRouter } from 'next/router';
import { CreateArticle } from '@/widgets/create-article';
import DefaultLayout from '@/layouts/default';
import { CategorySelect } from '@/features/editor/category-select';
import { CoverCropper } from '@/features/editor/cover-cropper';
import { articleQueries } from '@/entities/article';
import { Button, Spinner } from '@heroui/react';
import { URLtoFile, calculateReadingTime } from '@/shared/utils/editor';

export default function Sandbox() {
  const router = useRouter();

  const { mutate: createArticle, isPending } =
    articleQueries.useCreateArticleMutation();

  /* состояния формы */
  const [title, setTitle] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState(''); // data-url
  const [coverPosition, setCoverPosition] = useState('center');

  const handlePublish = async () => {
    if (!coverImage) {
      alert('Загрузите обложку');
      return;
    }

    const blocksString = localStorage.getItem('editorContent');
    const blocks = blocksString ? JSON.parse(blocksString) : [];

    const firstParagraph = blocks.find(
      (b: any) => b.type === 'paragraph' && b.content?.[0]?.text
    );
    const subtitle = firstParagraph
      ? firstParagraph.content[0].text.substring(0, 250)
      : '';

    /* data-url → File */
    const imageFile = await URLtoFile(coverImage, 'cover.jpg');

    const formData = new FormData();
    formData.append('photo', imageFile); // ← теперь точно File
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('body', JSON.stringify(blocks));
    formData.append('status', 'pending');
    formData.append('organization', '9');
    formData.append('readTime', calculateReadingTime(blocks).toString());
    selectedValues.forEach((v) => formData.append('categories', v));

    createArticle(formData, { onSuccess: () => router.push('/') });
  };

  return (
    <DefaultLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <CoverCropper
          onChange={setCoverImage} // ← data-url сразу в state
          onPositionChange={setCoverPosition}
        />

        <CategorySelect
          selectCategory={selectedValues}
          handleChange={setSelectedValues}
        />

        <CreateArticle onTitleChange={setTitle} />

        <Button
          color="primary"
          isLoading={isPending}
          onPress={handlePublish}
          isDisabled={!coverImage || !title.trim()}
        >
          {isPending ? <Spinner size="sm" /> : 'Опубликовать'}
        </Button>
      </div>
    </DefaultLayout>
  );
}
