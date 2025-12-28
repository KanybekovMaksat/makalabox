import {
  Formik,
  Form,
  ErrorMessage,
  useFormikContext,
  Field,
  FormikValues,
} from 'formik';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { pathKeys } from '~shared/lib/react-router';
import { userQueries, userTypes } from '~entities/user';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from '~shared/ui/error';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:2,
  boxShadow: 24,
  p: 3,
  textAlign:"center"
};

const initialUser: userTypes.CreateUserSchema = {
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  password: '',
};

function Page() {
  const [visibility, setVisibility] = useState(false);
  const handleClickShowPassword = () =>
    setVisibility((visibility) => !visibility);

  const {
    mutate: registerUser,
    isPending,
    isError,
    isSuccess,
  } = userQueries.useRegisterMutation();

  function saveCredentialsToLocalStorage(email:string, password:string) {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  }

  if (isSuccess) {
    return (
      <div className="my-20 w-[380px] bg-[white] mx-auto rounded-md px-5 py-7 border border-sc-100">
        <h1 className="font-bold text-center text-2xl text-pc-500">
          На вашу почту отправлено письмо для подтверждения вашей почты.
        </h1>
      </div>
    );
  }

  return (
    <div className="w-[380px]  mx-auto rounded-md px-5 py-7 ">
      <h1 className="font-bold text-2xl text-pc-500">
        Регистрация
      </h1>
      <Formik
        initialValues={initialUser}
        validate={validateForm}
        onSubmit={(user) => {
          registerUser({ user });
          saveCredentialsToLocalStorage(user.email, user.password);
        }}
      >
        <Form>
          <fieldset disabled={isPending}>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="email"
                name="email"
                label="Email"
                size="small"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="username"
                name="username"
                label="Псевдоним"
                size="small"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="firstName"
                name="firstName"
                label="Имя"
                size="small"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="lastName"
                name="lastName"
                size="small"
                label="Фамилия"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="password"
                name="password"
                label="Введите пароль"
                type={visibility ? 'text' : 'password'}
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="password-visibility"
                      size="small"
                      color="info"
                      onClick={handleClickShowPassword}
                    >
                      {visibility ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Подтвердите пароль"
                type={visibility ? 'text' : 'password'}
                size="small"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-xs text-[red]"
              />
            </fieldset>
          </fieldset>
          {isPending ? (
            <>
              <Modal
                open={!!isPending}
                onClose={() => false}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...style, width: 200 }}>
                  <h2 id="child-modal-title">Регистрация...</h2>
                </Box>
              </Modal>
            </>
          ) : (
            <SubmitButton />
          )}
        </Form>
      </Formik>
      {isError && (
        <p className="text-center text-xs text-[red]">
          Ошибка при выполнении запроса
        </p>
      )}
      <p className=" text-sm flex items-center justify-center mt-2 gap-1">
        Уже есть аккаунт?
        <Link className="font-bold text-second-100" to={pathKeys.login()}>
          Войдите
        </Link>
      </p>
    </div>
  );
}

function SubmitButton() {
  const { isValidating, isValid } = useFormikContext();
  return (
    <Button
      variant="contained"
      type="submit"
      className="w-full mb-2 bg-second-100"
      disabled={!isValid || isValidating}
    >
      Зарегистрироваться
    </Button>
  );
}

const validateForm = (values) => {
  const errors: Partial<FormikValues> = {};

  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Неправильный формат email';
  }
  if (!values.username) {
    errors.username = 'Обязательное поле';
  } else if (!/^[a-z0-9_.]+$/.test(values.username)) {
    errors.username = 'Можно использовать символы a-z, 0-9 и _.';
  }

  if (!values.firstName) {
    errors.firstName = 'Обязательное поле';
  }

  if (!values.lastName) {
    errors.lastName = 'Обязательное поле';
  }

  if (!values.password) {
    errors.password = 'Обязательное поле';
  } else if (values.password.length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 символов';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Обязательное поле';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают';
  }

  return errors;
};

export const RegisterPage = withErrorBoundary(Page, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
