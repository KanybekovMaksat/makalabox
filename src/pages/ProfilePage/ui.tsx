import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  LinearProgress,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { userQueries } from '~entities/user';
import { WriterArticlesList } from '~widgets/articles-list';
import { ProfileCard } from '~widgets/profile-card';
import WidgetsIcon from '@mui/icons-material/Widgets';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import { useNavigate } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { articleQueries } from '~entities/article';
import { useState } from 'react';
import { BoxesList } from '~widgets/boxes-list';
import { ModalPopup } from '~widgets/modal-popup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { OrganizationSelect } from '~features/editor/organization-select';
import { CategorySelect } from '~features/editor/category-select';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function ProfilePage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const {
    data: userData,
    isLoading,
    isError,
  } = userQueries.useLoginUserQuery();
  const { mutate: createBox } = articleQueries  .useBoxCreate();
  const {
    data: boxesData,
    isLoading: isBoxLoading,
    isError: isBoxError,
  } = articleQueries.useGetBoxes();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let content;

  if (isLoading || isBoxLoading) {
    content = <div>Loading...</div>;
  } else if (isError || isBoxError || (!userData && !boxesData)) {
    content = <div>Error fetching data.</div>;
  } else {
    content = (
      <>
        <ProfileCard />

        <div className="w-full my-4 flex flex-col max-w-[340px] gap-3 md:hidden">
          <Button
            onClick={() => setActive(true)}
            endIcon={<WidgetsIcon />}
            className="shadow-none font-bold border border-second-100 bg-[white] text-second-100"
            variant="outlined"
            size="large"
          >
            Создать коробку
          </Button>
          <Button
            onClick={() => navigate(pathKeys.rating())}
            endIcon={<FeaturedPlayListIcon />}
            className="shadow-none font-bold border border-second-100 bg-[white] text-second-100"
            variant="outlined"
            size="large"
          >
            Место в рейтинге
          </Button>
          <Button
            onClick={() => navigate(pathKeys.favorites())}
            endIcon={<BookmarksIcon />}
            className="shadow-none font-bold border border-second-100 bg-[white] text-second-100"
            variant="outlined"
            size="large"
          >
            Мои избранные
          </Button>
        </div>

        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          className="w-[340px]  md:max-w-[650px] md:w-[650px] bg-[white] border-2 border-sc-100 rounded flex justify-center my-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Мои статьи" {...a11yProps(0)} />
            <Tab label="Мои коробки" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <WriterArticlesList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <BoxesList boxesData={boxesData} />
        </CustomTabPanel>
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
      </>
    );
  }

  return (
    <Container maxWidth="md" className="my-10 flex flex-col items-center">
      {content}
    </Container>
  );
}
