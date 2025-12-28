import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { pathKeys } from '~shared/lib/react-router';
import { AboutPage } from './ui';
  
export const aboutPageRoute: RouteObject = {
  path: pathKeys.about(),
  element: createElement(AboutPage),
};
