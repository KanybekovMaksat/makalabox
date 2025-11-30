import { RouteObject } from 'react-router-dom';
import { createElement } from 'react';
import { MaksatPage } from './maksat-page.ui';


export const maksatPageRoute: RouteObject = {
  path: "Maksat",
  element: createElement(MaksatPage),
};
