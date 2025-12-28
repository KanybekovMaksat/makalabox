import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { pathKeys } from '~shared/lib/react-router';
import { BoxesPage } from './ui';

  
export const boxesPageRoute: RouteObject = {
  path: pathKeys.boxes(),
  element: createElement(BoxesPage),
};
