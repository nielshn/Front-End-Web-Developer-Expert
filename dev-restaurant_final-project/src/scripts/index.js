import 'regenerator-runtime';
import '../styles/main.scss';
import '../styles/responsive.scss';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  import('lodash.filter')
    .then((module) => module.default)
    .then(() => app.renderPage())
    .catch((err) => console.error(err.message));
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
