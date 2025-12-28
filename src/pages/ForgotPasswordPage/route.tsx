import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { ForgotPasswordPage } from './ui';

export const forgotPasswordPageRoute: RouteObject = {
  path: 'change-password/',
  element: createElement(ForgotPasswordPage),
};
