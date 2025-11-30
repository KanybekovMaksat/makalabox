import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { VerifyPage } from './verify-page.ui';

export const verifyPageRoute: RouteObject = {
  path: "activate/:uid/:token",
  element: createElement(VerifyPage),
};
