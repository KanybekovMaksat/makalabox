
import { RouteObject } from 'react-router-dom';
import { HomePage } from './home-page.ui';
import { createElement } from 'react';
import { pathKeys } from '~shared/lib/react-router';

export const homePageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(HomePage),
};
