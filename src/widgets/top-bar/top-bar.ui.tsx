import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Button,
  TextField,
  LinearProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import EditIcon from '@mui/icons-material/Edit';
import { removeCookie } from 'typescript-cookie';
import { pathKeys } from '~shared/lib/react-router';
import { userQueries } from '~entities/user';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { ModalPopup } from '~widgets/modal-popup';
import { OrganizationSelect } from '~features/editor/organization-select';
import { CategorySelect } from '~features/editor/category-select';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { articleQueries } from '~entities/article';

export function TopBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [active, setActive] = useState(false);

  const { data: userData } = userQueries.useLoginUserQuery();
  const {
    data: { firstName = '', lastName = '', role = '', photo = '' } = {},
  } = userData || {};

  const navigate = useNavigate();

  const { mutate: createBox } = articleQueries.useBoxCreate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    navigate(`${pathKeys.profile.root()}`);
  };

  const handleLogout = () => {
    removeCookie('access');
    localStorage.removeItem('refresh');
    navigate(`${pathKeys.home()}`);
    userQueries.userService.removeCache();
  };

  return (
    <AppBar
      position="fixed"
      className="shadow-none border-b-2 border-sc-100"
      color="inherit"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters className="flex justify-between">
          <Link
            to={pathKeys.home()}
            className="hidden md:flex text-[black]/70 font-medium   text-lg  duration-300"
          >
            <img src="/public/fav.png" className="w-7 mr-1" alt="" />
            Makalabox
          </Link>
          <div className="flex md:hidden">
            <WidgetsIcon />
            <Link to={pathKeys.home()} className="font-bold text-xl">
              Makalabox
            </Link>
          </div>

          <div className="flex gap-4">
            <div className="hidden md:flex items-center ml-3">
              <Link to={pathKeys.favorites()}>
                <Tooltip title="Сохранённые статьи">
                  <IconButton aria-label="navigate to favorites article page">
                    <BookmarkAddedIcon className="hover:text-second-100" />
                  </IconButton>
                </Tooltip>
              </Link>
              {role === 'writer' ? (
                <div className="flex gap-2">
                  <Button
                    className="border-pc-400 text-pc-400  hover:bg-second-100 hover:text-[white] hover:border-[white]"
                    size="small"
                    variant="outlined"
                    endIcon={<WidgetsIcon />}
                    onClick={() => setActive(true)}
                  >
                    Создать коробку
                  </Button>
                  <Button
                    onClick={() => navigate(pathKeys.editor.root())}
                    size="small"
                    className="border-pc-400 duration-300 text-pc-400 hover:border-[white]  hover:bg-second-100 hover:text-[white]"
                    variant="outlined"
                    endIcon={<EditIcon />}
                  >
                    Написать
                  </Button>
                </div>
              ) : null}
            </div>
            <div>
              <Tooltip title="Открыть профиль">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={`${firstName} ${lastName}`} src={photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/profile">Профиль</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </Container>
      <ModalPopup active={active} setActive={setActive}>
        <Formik
          initialValues={{
            name: '',
            photo: null,
            organization: null,
            categories: [],
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!values.name) {
              errors.name = 'Обязательное поле';
            }
            if (!values.photo) {
              errors.photo = 'Нужно загрузить файл';
            }
            if (!values.organization) {
              errors.organization = 'Выберите организацию';
            }
            if (values.categories.length === 0) {
              errors.categories = 'Выберите хотя бы одну категорию';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('organization', values.organization);
            values.categories.forEach((category, index) => {
              formData.append(`categories`, category);
            });
            if (values.photo) {
              formData.append('photo', values.photo);
            }
            createBox(
              { box: formData },
              {
                onSuccess: () => {
                  alert('Коробка успешно создана!');
                },
                onError: (error) => {
                  console.error('Ошибка:', error);
                  alert('Ошибка при создании коробки');
                },
              }
            );
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, values, errors, touched, isSubmitting }) => (
            <Form className="flex flex-col px-5">
              <h3 className="text-lg font-bold text-center mb-4">
                Создайте коробку для ваших статей
              </h3>

              <fieldset>
                <Field
                  as={TextField}
                  fullWidth
                  name="name"
                  label="Название коробки"
                  size="small"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-xs text-[red]"
                />
              </fieldset>

              <OrganizationSelect
                selectOrg={values.organization}
                handleChange={(org) => setFieldValue('organization', org)}
              />
              <ErrorMessage
                name="organization"
                component="div"
                className="text-xs text-[red]"
              />
              <CategorySelect
                selectCategory={values.categories}
                handleChange={(categories) =>
                  setFieldValue('categories', categories)
                }
              />
              <ErrorMessage
                name="categories"
                component="div"
                className="text-xs text-[red]"
              />
              <fieldset className="my-3">
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    setFieldValue('photo', file || null);
                  }}
                />
                <label htmlFor="photo">
                  <Button
                    size="small"
                    variant="contained"
                    component="span"
                    className="shadow-none w-full bg-pc-500"
                  >
                    Загрузить фото
                  </Button>
                </label>
                {values.photo && (
                  <p className="mt-2 text-xs">
                    Файл выбран: {values.photo.name}
                  </p>
                )}
                {errors.photo && touched.photo && (
                  <div className="text-xs text-[red]">{errors.photo}</div>
                )}
              </fieldset>

              {isSubmitting ? (
                <div className="w-full mb-2 min-h-[40px]">
                  <LinearProgress />
                </div>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  Сохранить
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </ModalPopup>
    </AppBar>
  );
}
