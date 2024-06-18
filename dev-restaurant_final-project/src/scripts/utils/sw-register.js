import { Workbox } from 'workbox-window';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker not supported in the browser'); // <-- Address this line
    return;
  }

  const wb = new Workbox('./sw.bundle.js');

  try {
    await wb.register();
    console.info('Service worker registered'); // <-- Address this line
  } catch (error) {
    console.error('Failed to register service worker', error); // <-- Address this line
  }
};

export default swRegister;
