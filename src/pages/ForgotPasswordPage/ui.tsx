import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { userContracts, userQueries, userTypes } from '~entities/user';
import { Button, IconButton, TextField } from '@mui/material';
import { pathKeys } from '~shared/lib/react-router';
import { formikContract } from '~shared/lib/zod';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from '~shared/ui/error';
import { Link } from 'react-router-dom';

function Page() {

  const {
    mutate: sendEmail,
    isPending,
    isError,
  } = userQueries.useResetPaswordSendEmail();

  return (
    <div className="w-[380px]  mx-auto rounded-md px-5 py-7 ">
      <h1 className="font-bold  text-2xl text-pc-500">Восстановление доступа</h1>
      <Formik
        initialValues={initialUser}
        validate={validateForm}
        onSubmit={(email) => sendEmail({ email })}
      >
        <Form>
          <fieldset disabled={isPending} className="text-xs text-[red]">
            <fieldset className="my-5">
              <Field
                as={TextField}
                fullWidth
                id="email"
                name="email"
                label="Email"
                size="small"
                className="rounded-lg"
              />
              <ErrorMessage name="email" />
            </fieldset>
          </fieldset>
          {isPending ? (
            <Button
              variant="contained"
              disabled
              className=" text-center  w-full"
            >
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
         Вернуться к авторизации
        </Link>
      </p>
    </div>
  );
}

const initialUser: userTypes.LoginUserDto = {
  email: '',
};

function SubmitButton() {
  const { isValidating, isValid } = useFormikContext();
  return (
    <Button
      variant="contained"
      type="submit"
      className="w-full mb-2 bg-second-100 shadow-none"
      disabled={!isValid || isValidating}
    >
      Отправить
    </Button>
  );
}

const validateForm = formikContract(userContracts.SendEmail);

export const ForgotPasswordPage = withErrorBoundary(Page, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
});
