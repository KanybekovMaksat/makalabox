import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { getCookie, setCookie } from 'typescript-cookie';

export const API_URL = 'https://api.makalabox.com/api/';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

const getAccessToken = () => getCookie('access') || null;

$api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return config;
});


$api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest?.custom?.isRetry
    ) {
      originalRequest.custom = { isRetry: true };

      try {
        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) {
          console.error('Refresh token отсутствует. Не могу обновить токен.');
          return Promise.reject(error);
        }
        const response = await axios.post(
          `${API_URL}jwt/refresh/`,
          { refresh: refreshToken },
          { withCredentials: true }
        );
        const newAccessToken = response.data.access;
        if (newAccessToken) {
          setCookie('access', newAccessToken);
          console.log('Токен успешно обновлен:', newAccessToken);

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
          return $api.request(originalRequest);
        } else {
          console.error('Ответ сервера не содержит нового access-токена.');
        }
      } catch (refreshError) {
        console.error('Ошибка обновления токена:', refreshError);
        localStorage.removeItem('refresh');
        setCookie('access', '', { expires: -1 });
        window.location.href = '/login';
      }
    }
    console.error('Ошибка запроса:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default $api;
