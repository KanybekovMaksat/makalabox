// import {
//   Avatar,
//   Card,
//   CardContent,
//   CardMedia,
//   Tooltip,
//   CircularProgress,
//   CardActionArea,
// } from '@mui/material';
// import dayjs from 'dayjs';
// import 'dayjs/locale/ru';
// import { Link, useNavigate } from 'react-router-dom';
// import { pathKeys } from '~shared/lib/react-router';
// import { articleQueries, articleTypes } from '~entities/article';
// import { ShareButton } from '~features/article/share-button';
// import { LikeButton } from '~features/article/like-button';
// import { FavoriteButton } from '~features/article/favorite-button';

// import VisibilityIcon from '@mui/icons-material/Visibility';
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// dayjs.locale('ru');

// export function ArticlesList() {
//   const {
//     data: articleData,
//     isLoading,
//     isSuccess,
//     isError,
//   } = articleQueries.useGetArticles();

//   if (isLoading) {
//     return (
//       <div>
//         <CircularProgress className="w-[50px] mx-auto flex justify-center" />
//         <p className="text-center mt-2">Загрузка статей...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     return <div className="my-20">Error fetching user data.</div>;
//   }

//   const articles = articleData?.data?.results;

//   if (articles.length == 0) {
//     return (
//       <div className="text-center font-medium">
//         К сожалению, у вас нет избранных статей📖
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center mx-auto gap-5 max-w-[100%] md:max-w-[90%] ">
//       {isSuccess &&
//         articles.map((article) => (
//           <ArticleCard article={article} key={article.id} />
//         ))}
//       <Link
//         className="flex justify-end underline text-pc-500 my-3"
//         to={pathKeys.feed()}
//       >
//         Смотреть больше
//         <NavigateNextIcon />
//       </Link>
//     </div>
//   );
// }

// // Article Card Component
// type ArticleCardProps = { article: articleTypes.Article };

// function ArticleCard(props: ArticleCardProps) {
//   const navigate = useNavigate();
//   const handleNavigate = (id: number) => {
//     navigate(pathKeys.article.byId({ id }));
//   };
//   return (
//     <Card className="min-w-full max-w-full md:min-w-[650px] md:max-w-[650px] shadow-none border border-sc-100  ">
//       <div className="flex flex-col">
//         <CardContent className="md:p-5 p-3">
//           <div className="flex justify-between items-center pb-3">
//             <div className="flex flex-col md:flex-row md:items-center gap-3">
//               <div className="flex items-center gap-4 cursor-pointer">
//                 <div className="flex items-center gap-2">
//                   <Avatar
//                     sizes="large"
//                     className="duration-500 card-avatar border-2 border-[white] h-11 w-11"
//                     alt={props.article.author.fullName}
//                     src={props.article.author.photo}
//                   />
//                   <div>
//                     <h5 className="flex text-base md:text-base font-bold gap-1 items-center">
//                       {props.article.author.fullName}
//                       {props.article.author.official ? (
//                         <Tooltip
//                           title="Официальный аккаунт"
//                           className="hover:cursor-pointer"
//                         >
//                           <img
//                             src="/official.svg"
//                             alt=""
//                             className="h-[20px]"
//                           />
//                         </Tooltip>
//                       ) : null}
//                     </h5>
//                     <Link
//                       className="text-[14px] mt-[-3px] text-[gray] underline block"
//                       to={`/${props.article.author.username}`}
//                     >
//                       @{props.article.author.username}
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="md:flex items-center gap-3 hidden">
//                   <p className="text-md text-pc-400 text-sm">
//                     {dayjs(props.article.created)
//                       .format('MMMM D, YYYY')
//                       .toUpperCase()}
//                   </p>
//                   <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
//                     <VisibilityIcon className="w-5" />
//                     {props.article.viewCount}
//                   </p>
//                   <Tooltip title="Время чтения">
//                     <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
//                       <AccessTimeFilledIcon className="w-4" />
//                       {props.article.readTime} мин
//                     </p>
//                   </Tooltip>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 px-1 mb-2 md:hidden">
//             <p className="text-md text-pc-400 text-sm">
//               {dayjs(props.article.created)
//                 .format('MMMM D, YYYY')
//                 .toUpperCase()}
//             </p>
//             <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
//               <VisibilityIcon className="w-5" />
//               {props.article.viewCount}
//             </p>
//             <Tooltip title="Время чтения">
//               <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
//                 <AccessTimeFilledIcon className="w-4" />
//                 {props.article.readTime} мин
//               </p>
//             </Tooltip>
//           </div>
//           <div
//             className="hover:cursor-pointer"
//             onClick={() => handleNavigate(props.article.id)}
//           >
//             <Link
//               to={`article/${String(props.article.id)}`}
//               className="font-bold text-lg md:text-xl title duration-300 block"
//             >
//               {props.article.title}
//             </Link>
//             <Link
//               to={`article/${String(props.article.id)}`}
//               className="text-[16px] md:text-md mt-2"
//             >
//               {props.article.subtitle}...
//             </Link>
//           </div>
//         </CardContent>
//         <CardActionArea onClick={() => handleNavigate(props.article.id)}>
//           <CardMedia
//             component="img"
//             className="w-full  h-auto md:max-h-[550px] cursor-pointer"
//             image={props.article.photo}
//             alt={props.article.title}
//             title={props.article.title}
//           />
//         </CardActionArea>
//         <div className="md:px-5 py-2 md:py-3 px-1 flex items-center justify-between">
//           <div className="flex gap-3">
//             <LikeButton
//               like={{
//                 id: props.article.id,
//                 likeCount: props.article.likeCount,
//                 likes: props.article.likes,
//               }}
//             />
//             <FavoriteButton id={props.article.id} />
//           </div>
//           <ShareButton title={props.article.title} id={props.article.id} />
//         </div>
//       </div>
//     </Card>
//   );
// }

'use client';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { pathKeys } from '@/shared/lib/react-router';
import { articleQueries, articleTypes } from '@/entities/article';
import { ShareButton } from '@/features/article/share-button';
import { LikeButton } from '@/features/article/like-button';
import { FavoriteButton } from '@/features/article/favorite-button';

import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Button } from '@heroui/button';
import { Avatar } from '@heroui/avatar';

import { Tooltip, Link as HLink, User, Spinner } from '@heroui/react';
import {
  Eye,
  Clock,
  ArrowRight,
  Share2,
  Heart,
  Bookmark,
  Verified,
} from 'lucide-react';

dayjs.locale('ru');

export function ArticlesList() {
  const {
    data: articleData,
    isLoading,
    isSuccess,
    isError,
  } = articleQueries.useGetArticles();

  console.log(articleData);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary" />
        <Spinner size="lg" />
        <p className="text-center mt-2">Загрузка статей...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center my-20 text-danger">
        Ошибка при загрузке статей.
      </div>
    );
  }

  const articles = articleData?.data?.results;
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center font-medium">
        К сожалению, у вас нет избранных статей 📖
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto gap-5 max-w-full md:max-w-[90%]">
      {isSuccess &&
        articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}

      <HLink
        href="/feed"
        className="flex items-center gap-1 text-primary underline my-3"
      >
        Смотреть больше
        <ArrowRight size={16} />
      </HLink>
    </div>
  );
}

type ArticleCardProps = { article: articleTypes.Article };

function ArticleCard({ article }) {
  const router = useRouter();

  const handleNavigate = () => router.push(`/article/${article.id}`);

  return (
    <Card
      isPressable
      onPress={handleNavigate}
      className="w-full md:w-[650px] shadow-none border border-default-200"
    >
      <CardHeader className="justify-between">
        <div className="flex gap-3 items-center">
          <User
            avatarProps={{
              src: article.author.photo,
            }}
            description={
              <Link href={`/${article.author.username}`} size="sm">
                @{article.author.username}
              </Link>
            }
            name={
              <div className="flex items-center gap-1">
                {article.author.fullName}
                {article.author.official && (
                  <Tooltip content="Официальный аккаунт">
                    <Verified className="text-sky-500" size={16} />
                  </Tooltip>
                )}
              </div>
            }
          />
        </div>
        <div className="hidden md:flex items-center gap-4 text-tiny text-default-400">
          <span>
            {dayjs(article.created).format('MMMM D, YYYY').toUpperCase()}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} /> {article.viewCount}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {article.readTime} мин
          </span>
        </div>
      </CardHeader>
      <CardBody className="py-2">
        <div className="md:hidden flex items-center gap-3 text-tiny text-default-400 mb-2">
          <span>
            {dayjs(article.created).format('MMMM D, YYYY').toUpperCase()}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} /> {article.viewCount}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {article.readTime} мин
          </span>
        </div>

        <Link
          href={`/article/${article.id}`}
          className="text-lg font-bold line-clamp-2"
        >
          {article.title}
        </Link>
        <p className="text-sm text-default-600 mt-1 line-clamp-2">
          {article.subtitle}...
        </p>

        <img
          src={article.photo}
          alt={article.title}
          className="w-full h-auto max-h-[320px] object-cover rounded-xl mt-3"
        />
      </CardBody>
      <CardFooter className="justify-between">
        <div className="flex gap-2">
          <LikeButton
            like={{
              id: article.id,
              likeCount: article.likeCount,
              likes: article.likes,
            }}
          />
          <FavoriteButton id={article.id} />
        </div>

        <ShareButton title={article.title} id={article.id} />
      </CardFooter>
    </Card>
  );
}
