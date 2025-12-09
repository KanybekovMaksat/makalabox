// pages/articles/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { getArticleDetail } from '@/entities/article';
import { ClientArticle } from '@/widgets/article-viewer/client-article';

export default function ArticlePage({ article }) {
  return <ClientArticle article={article} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const article = await getArticleDetail(Number(params?.id));
  if (!article) return { notFound: true };

  return { props: { article }, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};