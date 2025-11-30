import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  CircularProgress,
  IconButton,
  styled,
  alpha,
} from '@mui/material';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Link, useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { articleQueries, articleTypes } from '~entities/article';
import { userQueries } from '~entities/user';
import { StatusMenu } from '~features/article/status-menu';
import { ModalPopup } from '~widgets/modal-popup';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import TextsmsIcon from '@mui/icons-material/Textsms';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MoreVertIcon from '@mui/icons-material/MoreVert';

dayjs.locale('ru');

export function WriterArticlesList() {
  // const {
  //   data: articleData,
  //   isLoading,
  //   isSuccess,
  //   isError,
  // } = articleQueries.useGetWriterArticle();
  const {
    data: userData,
    isLoading,
    isError,
    isSuccess,
  } = userQueries.useLoginUserQuery();

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

  const articles = userData.data.articles;

  return (
    <div className="flex flex-col mx-auto gap-5 w-full items-center">
      {isSuccess &&
        articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
    </div>
  );
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

type ArticleCardProps = { article: articleTypes.Article };

function ArticleCard(props: ArticleCardProps) {
  const [active, setActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mutate: archivedArticle } = articleQueries.useArchivedArticleQuery(
    props.article.id
  );

  const handleArchived = async () => {
    await archivedArticle();
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/article/edit/${props.article.id}/`);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenMessage = () => {
    setAnchorEl(null);
    setActive(true);
  };

  return (
    <>
      <Card className="max-w-[650px] shadow-none border border-sc-100 p-2 card">
        <div className="flex flex-col-reverse md:flex-row items-center md:justify-between">
          <CardContent className='p-2 md:p-[16px]'>
            <div className="flex justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <StatusMenu initialStatus={props.article.status} />
                <p className="text-md text-pc-400 text-sm ">
                  {dayjs(props.article.created)
                    .format('MMMM D, YYYY')
                    .toUpperCase()}
                </p>
                <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
                  <VisibilityIcon className="w-5" />
                  {props.article.viewCount}
                </p>
                <Tooltip title="Время чтения">
                  <p className="text-md text-pc-400 flex items-center gap-1 text-sm">
                    <AccessTimeFilledIcon className="w-4" />
                    {props.article.readTime} мин
                  </p>
                </Tooltip>
              </div>
              <IconButton
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleEdit}
                  disableRipple
                  className="text-sm"
                >
                  <EditIcon />
                  Редактировать
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  disableRipple
                  className="text-sm"
                >
                  <ArchiveIcon />
                  Архивировать
                </MenuItem>
                {true ? (
                  <MenuItem
                    onClick={handleOpenMessage}
                    disableRipple
                    className="text-sm"
                  >
                    <TextsmsIcon />
                    Причина отклонения
                  </MenuItem>
                ) : null}
              </StyledMenu>
            </div>
            <div>
              {props.article.status === 'approved' ? (
                <Link
                  className="font-bold text-xl title duration-300"
                  to={pathKeys.article.byId({ id: props.article.id })}
                >
                  {props.article.title}
                </Link>
              ) : (
                <h4 className="font-bold text-xl title duration-300">
                  {props.article.title}
                </h4>
              )}
              <p className="text-md mt-2">{props.article.subtitle}</p>
            </div>
          </CardContent>
        </div>
        <CardMedia
          component="img"
          className="w-full max-h-[450px] rounded md:mr-[12px]"
          image={props.article.photo}
          alt={props.article.title}
          title={props.article.title}
        />
      </Card>
      <ModalPopup active={active} setActive={setActive}>
        <p> {props.article.moderatorComment}</p>
      </ModalPopup>
    </>
  );
}
