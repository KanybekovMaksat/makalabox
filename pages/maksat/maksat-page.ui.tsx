import { Avatar } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import vite from './assets/vitejs.svg';
import Git from './assets/git-icon.svg';
import Chrome from './assets/Chrome-DevTools.svg';
import ReactIcon from './assets/react-2 (1).svg';
import typescript from './assets/typescript (1).svg';
import html from './assets/html-1.svg';
import gitlab from './assets/gitlab.svg';
import goodle from './assets/google-lighthouse.svg';

const skills = [
  'Адаптивная вёрстка на HTML и CSS',
  'Работа в графическом редакторе Figma',
  'Работа в VS Code',
  'Использование препроцессора Sass',
  'Работа в системе контроля версий Git',
  'Владение инструментами оптимизации изображений и кода',
  'Верстка по Pixel Perfect',
  'Программирование на JavaScript, использование REST API',
  'Программирование на TypeScript',
  'Работа со сборщиками Webpack, Vite',
  'Написание тестов на Jest и Vitest',
  'Владение React.js/Vue.js',
  'Придерживание компонентного подхода',
  'Коммуникабельность, понимание своей роли в команде разработки',
];

const firstHalf = skills.slice(0, 7);
const secondHalf = skills.slice(7);

const toolsAndSkills = [
  { title: 'Vite', icon: vite },
  { title: 'Eslint', icon: '' },
  { title: 'Sass', icon: '' },
  { title: 'Lighthouse', icon: goodle },
  { title: 'HTML', icon: html },
  { title: 'GitLab', icon: gitlab },
  { title: 'Git', icon: Git },
  { title: 'React', icon: ReactIcon },
  { title: 'TypeScript', icon: typescript },
  { title: 'JavaScript', icon: '' },
  { title: 'REST API', icon: '' },
  { title: 'CSS', icon: '' },
  { title: 'Chrome DevTools', icon: Chrome },
];

export function MaksatPage() {
  return (
    <div>
    </div>
  );
}
