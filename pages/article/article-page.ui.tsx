import { CircularProgress, Container, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { articleQueries } from '~entities/article';
import { withSuspense } from '~shared/lib/react';
import { ArticleInfo } from '~widgets/article-info';
import { ArticleViewer } from '~widgets/article-viewer';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from '~shared/ui/error';
import { CommentList } from '~widgets/comment-list';
import { CommentForm } from '~widgets/comment-form';
import { Helmet } from 'react-helmet-async';
import { LikeButton } from '~features/article/like-button';
import { FavoriteButton } from '~features/article/favorite-button';
import { ShareButton } from '~features/article/share-button';

function Page() {
  const { id } = useParams();
  const [preLoad, setPreLoad] = useState(true);

  useEffect(() => {
    setPreLoad(false);
  }, []);

  const {
    data: articleData,
    isLoading,
    isError,
  } = articleQueries.useGetArticleDetail(parseInt(id));

  articleQueries.useUpdateArticleView(Number(id));

  useEffect(() => {
    if (articleData) {
      const { title, subtitle, photo, author, created } = articleData.data;
      document.title = title;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', subtitle);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content = subtitle;
        document.head.appendChild(metaDescription);
      }
      const ogTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: subtitle },
        { property: 'og:image', content: photo },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: window.location.href },
        { property: 'article:published_time', content: created },
        { property: 'article:author', content: author.fullName },
      ];
      ogTags.forEach((tag) => {
        let metaTag = document.querySelector(
          `meta[property="${tag.property}"]`
        );
        if (metaTag) {
          metaTag.setAttribute('content', tag.content);
        } else {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('property', tag.property);
          metaTag.content = tag.content;
          document.head.appendChild(metaTag);
        }
      });

      const structuredData = {
        '@context': 'https://schema.org/',
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': window.location.href,
        },
        headline: title,
        description: subtitle,
        image: {
          '@type': 'ImageObject',
          url: photo,
          width: '200',
          height: '98',
        },
        author: {
          '@type': 'Person',
          name: author.fullName,
        },
        publisher: {
          '@type': 'Organization',
          name: author.fullName,
          logo: {
            '@type': 'ImageObject',
            url: '',
            width: '',
            height: '',
          },
        },
        datePublished: created,
      };

      const scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(scriptTag);

      return () => {
        document.head.removeChild(scriptTag);
        ogTags.forEach((tag) => {
          const metaTag = document.querySelector(
            `meta[property="${tag.property}"]`
          );
          if (metaTag) {
            document.head.removeChild(metaTag);
          }
        });
      };
    }
  }, [articleData]);

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        className="mx-auto my-[65px] px-2 md:px-5 mb-5 flex flex-col items-center"
      >
        <CircularProgress className="w-[50px] mt-20 mx-auto" />
        <p className="text-center mt-2">Загрузка статьи...</p>
      </Container>
    );
  }

  if (isError || !articleData) {
    return (
      <div className="my-20 text-center">Error fetching article data.</div>
    );
  }
  const { title, subtitle, id: articleId, photo } = articleData.data;

  return (
    <div>
      <Helmet prioritizeSeoTags>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={subtitle} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="ru_Ru" />
        <meta property="og:image" content={photo} data-rh="true" />
        <meta property="og:image:type" content="image/png" data-rh="true" />
        <meta property="og:locale" content="ru_Ru" data-rh="true" />
      </Helmet>
      <Container maxWidth="md" className="mx-auto mb-[65px]">
        {articleData && (
          <div className="min-w-full max-w-full md:max-w-[95%] bg-[white] px-2 md:px-5 mb-5">
            <ArticleInfo article={articleData.data} />
            <Divider />
            {preLoad ? (
              <div className="max-w-full md:max-w-[95%] bg-[white] px-2 md:px-5  mb-5">
                <CircularProgress />
                Загрузка...
              </div>
            ) : (
              <>
                <ArticleViewer
                  title={articleData.data.title}
                  body={
                    Array.isArray(articleData?.data?.body)
                      ? articleData.data.body
                      : []
                  }
                />
                <div className="flex justify-between pb-5">
                  <div className="flex gap-2">
                    <LikeButton
                      like={{
                        id: articleData.data.id,
                        likeCount: articleData.data.likeCount,
                        likes: articleData.data.likes,
                      }}
                    />
                    <FavoriteButton id={articleData.data.id} />
                  </div>
                  <ShareButton
                    title={articleData.data.title}
                    id={articleData.data.id}
                  />
                </div>
              </>
            )}
          </div>
        )}
        <div className="max-w-full md:max-w-[95%] bg-[white] px-2 py-5  md:p-5">
          <h3 className="font-bold text-2xl">Комментарии</h3>
          <CommentForm id={parseInt(id)} />
          <CommentList id={parseInt(id)} />
        </div>
      </Container>
    </div>
  );
}

function Loader() {
  return <div className="my-20">loading...</div>;
}
const SuspensedPage = withSuspense(Page, {
  fallback: <Loader />,
});

export const ArticlePage = withErrorBoundary(SuspensedPage, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
