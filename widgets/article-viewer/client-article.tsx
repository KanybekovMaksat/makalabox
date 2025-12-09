'use client';
import { useGetArticleDetail } from '@/entities/article';
import { ArticleViewer } from './article-viewer.ui';
import { Spinner } from '@heroui/react';
import DefaultLayout from '@/layouts/default';

export function ClientArticle({ article }) {
  const { data, isLoading } = useGetArticleDetail(article.id);

  if (isLoading)
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner />
        </div>{' '}
      </DefaultLayout>
    );

  return (
    <DefaultLayout>
      <ArticleViewer body={data.data.body} />
    </DefaultLayout>
  );
}
