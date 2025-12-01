// import { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Avatar,
//   Chip,
//   IconButton,
//   CircularProgress,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { ModalPopup } from '~widgets/modal-popup';
// import { articleQueries } from '~entities/article';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import { userQueries } from '~entities/user';

// export const BoxesList = ({ boxesData }) => {
//   const [active, setActive] = useState(false);
//   const [activeBoxId, setActiveBoxId] = useState(null);
//   const {
//     data: userData,
//     isLoading,
//     isError,
//   } = userQueries.useLoginUserQuery();

//   const { mutate: addArticleToBox, isLoading: isAdding } =
//     articleQueries.useAddArticleToBox();

//   const handleAddArticle = (boxId: number, articleId: number) => {
//     addArticleToBox({ id: boxId, articleId });
//   };

//   const handleRemoveArticle = (boxId: number, articleId: number) => {
//     addArticleToBox({ id: boxId, articleId });
//   };

//   const articles = userData?.data?.articles || [];

//   if (isLoading) {
//     return <CircularProgress className="w-[50px] mx-auto" />;
//   }

//   if (isError) {
//     return <div>Error fetching user data.</div>;
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       {boxesData?.data?.results?.map((box) => (
//         <>
//           <Card
//             key={box.id}
//             className="flex flex-col md:flex-row shadow-none border-2 border-[gray]/50 p-4 gap-4 md:w-[650px] w-[320px] hover:shadow-xl hover:border-second-100 hover:cursor-pointer"
//           >
//             <CardMedia
//               component="img"
//               image={box.photo || '/placeholder.png'}
//               alt={box.name}
//               className="md:w-[150px] w-full min-h-[145px] max-h-[150px] object-cover rounded-md border border-[gray]/50"
//             />
//             <CardContent className="flex-1 flex flex-col gap-1 p-0">
//               <div className="flex justify-between">
//                 <div className="flex items-center gap-2">
//                   <Avatar
//                     src={box.author.photo || '/placeholder.png'}
//                     alt={box.author.fullName}
//                     className="w-8 h-8"
//                   />
//                   <div>
//                     <Typography
//                       variant="body2"
//                       className="font-semibold flex gap-1 m-0"
//                     >
//                       {box.author.fullName}
//                     </Typography>
//                     <Link
//                       to={`/${box.author.username}`}
//                       className="text-[14px] block mt-[-2px] text-[gray] underline"
//                     >
//                       @{box.author.username}
//                     </Link>
//                   </div>
//                 </div>
//                 <IconButton onClick={() => setActive(true)}>
//                   <AddCircleIcon />
//                 </IconButton>
//               </div>
//               <Typography variant="h6" className="font-semibold">
//                 {box.name}
//               </Typography>
//               <div className="flex items-center gap-2">
//                 <Typography variant="body2" className="text-[gray]">
//                   Количество статей:{' '}
//                   <span className="text-blue-500">{box.articles.length}</span>
//                 </Typography>
//               </div>
//               <div className="flex gap-2 mt-2">
//                 {box.categories?.map((category, index) => (
//                   <Chip
//                     key={index}
//                     className="rounded font-semibold bg-second-100 text-[white] text-[10px] h-[20px]"
//                     label={category}
//                   />
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//           <ModalPopup key={box.id} active={active} setActive={setActive}>
//             <h2 className="text-center font-bold text-[25px]">Ваши статьи</h2>
//             <div className="flex flex-col gap-1">
//               {articles.map((article) => {
//                 // Проверяем, есть ли статья в коробке
//                 const isArticleInBox = box.articles.some(
//                   (boxArticle) => boxArticle.id === article.id
//                 );

//                 return (
//                   <div
//                     key={article.id}
//                     className="border border-[gray] rounded p-1 py-2 flex justify-between items-center"
//                   >
//                     <span>{article.title}</span>
//                     <button
//                       onClick={() => {
//                         // В зависимости от того, есть ли статья в коробке, вызываем нужную функцию
//                         if (isArticleInBox) {
//                           handleRemoveArticle(box.id, article.id); // Удалить статью из коробки
//                         } else {
//                           handleAddArticle(box.id, article.id); // Добавить статью в коробку
//                         }
//                       }}
//                       className="text-blue-500 hover:underline"
//                     >
//                       {isArticleInBox ? 'Удалить' : 'Добавить'}
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//             {isAdding && <p>Добавление...</p>}
//           </ModalPopup>
//         </>
//       ))}
//     </div>
//   );
// };

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { articleQueries } from '~entities/article';
import { userQueries } from '~entities/user';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

export const BoxesList = ({ boxesData }) => {
  const [expandedBoxId, setExpandedBoxId] = useState(null); // Состояние для отслеживания раскрытых коробок
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();

  const { mutate: addArticleToBox, isLoading: isAdding } =
    articleQueries.useAddArticleToBox();

  const handleAddArticle = (boxId: number, articleId: number) => {
    addArticleToBox({ id: boxId, articleId });
  };

  const handleRemoveArticle = (boxId: number, articleId: number) => {
    addArticleToBox({ id: boxId, articleId });
  };

  const articles = userData?.data?.articles || [];

  if (isLoading) {
    return <CircularProgress className="w-[50px] mx-auto" />;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <div className="flex flex-col ">
      {boxesData?.data?.results?.map((box) => (
        <div key={box.id}>
          <Card className="flex flex-col md:flex-row shadow-none border-2 border-[gray]/50 p-4 gap-4 md:w-[650px] w-[320px] hover:border-second-100 hover:cursor-pointer">
            <CardMedia
              component="img"
              image={box.photo || '/placeholder.png'}
              alt={box.name}
              className="md:w-[150px] w-full min-h-[145px] max-h-[150px] object-cover rounded-md border border-[gray]/50"
            />
            <CardContent className="flex-1 flex flex-col gap-1 p-0">
              {/* <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Avatar
                    src={box.author.photo || '/placeholder.png'}
                    alt={box.author.fullName}
                    className="w-8 h-8"
                  />
                  <div>
                    <Typography
                      variant="body2"
                      className="font-semibold flex gap-1 m-0"
                    >
                      {box.author.fullName}
                    </Typography>
                    <Link
                      to={`/${box.author.username}`}
                      className="text-[14px] block mt-[-2px] text-[gray] underline"
                    >
                      @{box.author.username}
                    </Link>
                  </div>
                </div>
              </div> */}
              <Typography variant="h6" className="font-semibold">
                {box.name}
              </Typography>
              <div className="flex items-center gap-2">
                <Typography variant="body2" className="text-[gray]">
                  Количество статей:
                  <span className="text-blue-500">{box.articles.length}</span>
                </Typography>
              </div>
              <div className="flex gap-2 mt-2">
                {box.categories?.map((category, index) => (
                  <Chip
                    key={index}
                    className="rounded font-semibold border bg-[none] border-second-100 text-second-100 text-[10px] h-[20px]"
                    label={category}
                  />
                ))}
              </div>
              <Button
                variant="contained"
                size="small"
                className="shadow-none mt-3 flex items-center gap-2 bg-second-100"
                onClick={() =>
                  setExpandedBoxId(expandedBoxId === box.id ? null : box.id)
                }
              >
                {expandedBoxId === box.id ? 'Скрыть статьи' : 'Показать статьи'}
                {expandedBoxId === box.id ? <ExpandCircleDownIcon className='rotate-180'/> : <ExpandCircleDownIcon/>}
              </Button>
            </CardContent>
          </Card>
          <div
            className={`bg-[white] p-5 md:max-w-[650px] max-w-[320px] mb-5 accordion-content ${
              expandedBoxId === box.id ? 'show' : ''
            }`}
          >
            <h3 className="font-bold mb-2">Ваши статьи:</h3>
            <div className="flex flex-col gap-2">
              {articles.map((article) => {
                const isArticleInBox = box.articles.some(
                  (boxArticle) => boxArticle.id === article.id
                );

                return (
                  <div
                    key={article.id}
                    className="border border-[gray] rounded p-1 py-2 flex justify-between items-center"
                  >
                    <span>{article.title}</span>
                    <button
                      onClick={() => {
                        if (isArticleInBox) {
                          handleRemoveArticle(box.id, article.id);
                        } else {
                          handleAddArticle(box.id, article.id);
                        }
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      {isArticleInBox ? (
                        <RemoveCircleIcon className="text-[#F54A45]" />
                      ) : (
                        <AddCircleIcon className="text-[#34C724]" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            {isAdding && <p>Добавление...</p>}
          </div>
        </div>
      ))}
    </div>
  );
};
