import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikValues,
  useFormikContext,
} from 'formik';
import { userQueries, userTypes } from '~entities/user';
import { Button, IconButton, TextField } from '@mui/material';
import { pathKeys } from '~shared/lib/react-router';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from '~shared/ui/error';
import { Link, useParams } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';

function Page() {
  const [visibility, setVisibility] = useState(false);
  const handleClickShowPassword = () =>
    setVisibility((visibility) => !visibility);

  const { uid, token } = useParams();

  const {
    mutate: updatePassword,
    isPending,
    isError,
  } = userQueries.useResetPasword();

  const initialState: userTypes.UpdatePassword = {
    uid: uid,
    token: token,
    newPassword: '',
    confirmPassword: '',
  };

  return (
    <div className="w-[380px]  mx-auto rounded-md px-5 py-7 ">
      <h1 className="font-bold  text-2xl text-pc-500">Сброс пароля</h1>
      <Formik
        initialValues={initialState}
        validate={validateForm}
        onSubmit={(data) => updatePassword({ data })}
      >
        <Form>
          <fieldset disabled={isPending} className="text-xs text-[red]">
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="newPassword"
                name="newPassword"
                label="Введите новый пароль"
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
                name="newPassword"
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
            <Button variant="contained" disabled className="text-center w-full">
              Отправка данных...
            </Button>
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
        Есть аккаунт?
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
      className="w-full mb-2 bg-second-100 shadow-none"
      disabled={!isValid || isValidating}
    >
      Обновить пароль
    </Button>
  );
}

const validateForm = (values) => {
  const errors: Partial<FormikValues> = {};

  if (!values.newPassword) {
    errors.newPassword = 'Обязательное поле';
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'Пароль должен содержать минимум 6 символов';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Обязательное поле';
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают';
  }

  return errors;
};

export const ChangePasswordPage = withErrorBoundary(Page, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
