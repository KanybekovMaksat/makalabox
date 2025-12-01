import {
  editUserProfile,
  emailActivationMutation,
  getTokenMutation,
  getUserByUsername,
  loginUserQuery,
  registerUserMutation,
  resetPasswordConfirm,
  resetPasswordEmail,
} from './user.api';
import {
  useMutation,
  useQuery,
  queryOptions as tsqQueryOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { pathKeys } from '~shared/lib/react-router';
import { useNavigate } from 'react-router-dom';
import { setCookie } from 'typescript-cookie';
import { toast } from 'react-toastify';
import { queryClient } from '~shared/lib/react-query/react-query.lib';
import { UserDtoSchema } from './user.types';

const keys = {
  root: () => ['user'],
  getToken: () => [...keys.root(), 'getToken'] as const,
  loginUser: () => [...keys.root(), 'loginUser'] as const,
  registerUser: () => [...keys.root(), 'registerUser'] as const,
  user: (username: string) => [...keys.root(), 'username', username] as const,
};

export const userService = {
  queryKey: () => keys.root(),

  removeCache: () => queryClient.removeQueries({ queryKey: keys.root() }),

  getCache: () => queryClient.getQueryData<Comment[]>(userService.queryKey()),

  setCache: (user: UserDtoSchema) =>
    queryClient.setQueryData(userService.queryKey(), user),

  queryOptions: () => {
    const userKey = userService.queryKey();
    return tsqQueryOptions({
      queryKey: userKey,
      queryFn: async () => loginUserQuery,
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(userKey)?.dataUpdatedAt,
    });
  },

  prefetchQuery: async () =>
    queryClient.prefetchQuery(userService.queryOptions()),

  ensureQueryData: async () =>
    queryClient.ensureQueryData(userService.queryOptions()),
};

type AxiosErrorType = {
  code: string;
  config: any;
  message: string;
  name: string;
  request: any;
  response?: {
    data: any;
    status: number;
    headers: any;
    config: any;
  };
};

export function useLoginUserQuery() {
  return useQuery({
    queryKey: keys.loginUser(),
    queryFn: loginUserQuery,
  });
}

export function useGetTokenMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: keys.getToken(),
    mutationFn: getTokenMutation,
    onSuccess: async (response) => {
      setCookie('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      toast.success('Вы успешно авторизовались!', { autoClose: 500 });
      navigate(pathKeys.profile.root());
    },
    onError: (error: AxiosErrorType) => {
      const errorMessage = error.response
        ? error.response.data.detail
        : 'Ошибка при выполнении запроса';
      toast.error(errorMessage);
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationKey: keys.registerUser(),
    mutationFn: registerUserMutation,
    onSuccess: async () => {
      await toast.success(
        'На вашу почту отправлено письмо для подтверждения вашей почты.'
      );
    },
    onError: (error: AxiosErrorType) => {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((field) => {
          toast.error(`${field}: ${errors[field][0]}`);
        });
      } else {
        toast.error('Ошибка при выполнении запроса');
      }
    },
  });
}

export function useEditUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: keys.root(),
    mutationFn: editUserProfile,
    onSuccess: async () => {
      await toast.success('Ваш профиль успешно изменен!');
      await queryClient.invalidateQueries({ queryKey: keys.root() });
    },
    onError: (error: AxiosErrorType) => {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((field) => {
          toast.error(`${field}: ${errors[field][0]}`);
        });
      } else {
        toast.error('Ошибка при выполнении запроса');
      }
    },
  });
}

export function useActivationMutation() {
  return useMutation({
    mutationKey: keys.registerUser(),
    mutationFn: emailActivationMutation,
    onSuccess: async () => {
      await toast.success('Success');
    },
    onError: (error: AxiosErrorType) => {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((field) => {
          toast.error(`${field}: ${errors[field][0]}`);
        });
      } else {
        toast.error('Ошибка при выполнении запроса');
      }
    },
  });
}
export function useResetPaswordSendEmail() {
  return useMutation({
    mutationKey: keys.root(),
    mutationFn: resetPasswordEmail,
    onSuccess: async () => {
      await toast.success('На вашу почту отправлено сообщение для сброса пароля');
    },
    onError: (error: AxiosErrorType) => {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((field) => {
          toast.error(`${field}: ${errors[field][0]}`);
        });
      } else {
        toast.error('Ошибка при выполнении запроса');
      }
    },
  });
}

export function useResetPasword() {
  return useMutation({
    mutationKey: keys.root(),
    mutationFn: resetPasswordConfirm,
    onSuccess: async () => {
      await toast.success('Пароль успешно изменен!');
    },
    onError: (error: AxiosErrorType) => {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((field) => {
          toast.error(`${field}: ${errors[field][0]}`);
        });
      } else {
        toast.error('Ошибка при выполнении запроса');
      }
    },
  });
}

export function useGetUserByUsername(username: string) {
  return useQuery({
    queryKey: keys.user(username),
    queryFn: () => getUserByUsername(username),
  });
}
