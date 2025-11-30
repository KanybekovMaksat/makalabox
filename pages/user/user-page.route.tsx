import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { UserPage } from './user-page.ui';

export const userPageRoute: RouteObject = {
  path: "/:username/",
  element: createElement(UserPage),
};
