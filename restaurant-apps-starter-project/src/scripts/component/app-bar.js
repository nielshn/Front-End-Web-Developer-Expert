class AppBar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const nav = document.createElement('nav');
        nav.innerHTML = `
        <div class="logo">Restaurant Apps</div>
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Favorite</a></li>
        <li><a href="#">About Us</a></li>
      </ul>
      <div class="menu-toggle">☰</div>
        `
        shadow.appendChild(nav);
        this._addStyles();
    }

    _addStyles() {
        const style = document.createElement('style');
        style.textContent = `
        nav {
            background-color: #333;
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo {
            font-size: 1.5rem;
          }
          .nav-links {
            list-style: none;
            display: flex;
          }
          .nav-links li {
            margin-right: 1rem;
          }`
        this.shadowRoot.appendChild(style);
    }
}

customElements.define('app-bar', AppBar);