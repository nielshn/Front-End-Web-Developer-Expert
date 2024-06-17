const DrawerInitiator = {
    init({ button, drawer, content }) {
        button.addEventListener('click', function(event) {
            DrawerInitiator._toggleDrawer(event, button, drawer);
        });

        content.addEventListener('click', function(event) {
            DrawerInitiator._closeDrawer(event, drawer);
        });
    },

    _toggleDrawer(event, button, drawer) {
        event.stopPropagation();
        drawer.classList.toggle('open');
        button.classList.toggle('active');
        document.querySelector('.nav-menu').classList.toggle('active');
    },

    _closeDrawer(event, drawer) {
        event.stopPropagation();
        drawer.classList.remove('open');
    }
};

export default DrawerInitiator;
