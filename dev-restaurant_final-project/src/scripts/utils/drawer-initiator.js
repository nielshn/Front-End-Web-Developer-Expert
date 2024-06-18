const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      this.toggleDrawer(event, button, drawer);
    });

    content.addEventListener('click', (event) => {
      this.closeDrawer(event, drawer);
    });
  },

  toggleDrawer(event, button, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
    button.classList.toggle('active');
    document.querySelector('.nav-menu').classList.toggle('active');
  },

  closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
