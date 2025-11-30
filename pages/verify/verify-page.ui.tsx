import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userQueries } from '~entities/user';
import { pathKeys } from '~shared/lib/react-router';

export function VerifyPage() {
  const { uid, token } = useParams();

  const {
    mutate:emailActivation,
    isPending: isActivationPending,
    isError: isActivationError,
    isSuccess: isActivationSuccess,
  } = userQueries.useActivationMutation();

  const { mutate: loginToken, isPending: isLoginPending } =
    userQueries.useGetTokenMutation();

  useEffect(() => {
    emailActivation({ data: { uid, token } });
  }, []);

  useEffect(() => {
    if (isActivationSuccess) {
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      loginToken({ user: { email, password } });
    }
  }, [isActivationSuccess]);

  return (
    <div className="my-20 w-[400px] bg-[white] mx-auto rounded-md px-5 py-7 border border-sc-100 flex flex-col gap-3">
      <p className="text-center text-lg font-medium">Активация вашего email</p>
      {isActivationPending && <CircularProgress />}
      {isLoginPending && <CircularProgress />}
      {isActivationSuccess && (
        <p className="text-center text-lg font-medium text-[green]">
          Ваша почта прошла верификацию
        </p>
      )}
      {isActivationError && (
        <p className="text-center text-lg font-medium text-[red]">
          Ваша почта не прошла верификацию
        </p>
      )}
      <Link
        to={pathKeys.login()}
        className="border border-second-100 px-20 py-2 rounded text-lg text-center"
      >
        Войти
      </Link>
    </div>
  );
}
