import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { UserPage } from './ui';

export const userPageRoute: RouteObject = {
  path: "/:username/",
  element: createElement(UserPage),
};
