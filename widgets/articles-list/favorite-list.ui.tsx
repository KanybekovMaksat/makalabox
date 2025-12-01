import {
  CircularProgress,
} from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { articleQueries } from '~entities/article';
import { ArticleCard } from '~features/article/article-card/article-card.ui';

dayjs.locale('ru');

export function FavoriteArticlesList() {
  const {
    data: articleData,
    isLoading,
    isSuccess,
    isError,
  } = articleQueries.useGetFavoriteArticles();

  if (isLoading) {
    return (
      <div>
        <CircularProgress className="w-[50px] mx-auto flex justify-center" />
        <p className="text-center mt-2">Загрузка статей...</p>
      </div>
    );
  }

  if (isError) {
    return <div className="my-20">Error fetching user data.</div>;
  }

  const articles = articleData?.data?.favoriteArticles;

  const publishedArticles = !articles
    ? []
    : articles.filter((article) => article.status === 'approved');

  if (publishedArticles.length == 0) {
    return (
      <div className="text-center font-medium">
        К сожалению, у вас нет избранных статей📖
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto gap-5 max-w-[90%]">
      {isSuccess &&
        publishedArticles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
    </div>
  );
}

// Article Card Component
// type ArticleCardProps = { article: articleTypes.Article };

// function ArticleCard(props: ArticleCardProps) {
//   return (
//     <Card className="min-w-full max-w-full  shadow-none border border-sc-100 p-2 card">
//       <div className="flex flex-col-reverse md:flex-row items-center md:justify-between">
//         <CardContent className="md:p-[12px] p-2">
//           <div className="flex justify-between items-center pb-3">
//             <div className="flex flex-col md:flex-row md:items-center gap-3">
//               <div className="flex items-center gap-4 cursor-pointer">
//                 <div className="flex items-center">
//                   <Avatar
//                     className="duration-500 card-avatar border-2 border-[white]"
//                     alt={props.article.author.fullName}
//                     src={props.article.author.photo}
//                   />
//                   <h5 className="flex text-sm md:text-base  font-bold duration-300">
//                     {props.article.author.fullName}
//                   </h5>
//                 </div>
//                 <Tooltip title="Время чтения">
//                   <p className="text-md text-pc-400 flex items-center md:hidden gap-1 text-sm">
//                     <AccessTimeFilledIcon className="w-4" />
//                     {props.article.readTime} мин
//                   </p>
//                 </Tooltip>
//               </div>
//               <div className="flex items-center gap-3">
//                 <p className="text-md text-pc-400 text-sm ">
//                   {dayjs(props.article.created)
//                     .format('MMMM D, YYYY')
//                     .toUpperCase()}
//                 </p>
//                 <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
//                   <VisibilityIcon className="w-5" />
//                   {props.article.viewCount}
//                 </p>
//                 <Tooltip title="Время чтения">
//                   <p className="text-md text-pc-400 hidden md:flex items-center gap-1 text-sm">
//                     <AccessTimeFilledIcon className="w-4" />
//                     {props.article.readTime} мин
//                   </p>
//                 </Tooltip>
//               </div>
//             </div>
//           </div>
//           <div>
//             <Link
//               className="card-info"
//               to={pathKeys.article.byId({ id: props.article.id })}
//             >
//               <h4 className="font-bold text-xl title duration-300">
//                 {props.article.title}
//               </h4>
//               <p className="text-md text-pc-500 min-h-[70px]">
//                 {props.article.subtitle}...
//               </p>
//             </Link>
//             <div className="pt-2 flex items-center gap-1">
//               <LikeButton
//                 like={{
//                   id: props.article.id,
//                   likeCount: props.article.likeCount,
//                   likes: props.article.likes,
//                 }}
//               />
//               <FavoriteButton id={props.article.id} />
//               <ShareButton id={props.article.id} />
//             </div>
//           </div>
//         </CardContent>
//         <CardMedia
//           component="img"
//           className="w-[95%] md:max-w-[250px] min-h-[230px] max-h-[230px] rounded md:mr-[12px] cursor-pointer"
//           image={props.article.photo}
//           alt={props.article.title}
//           title={props.article.title}
//         />
//       </div>
//     </Card>
//   );
// }
