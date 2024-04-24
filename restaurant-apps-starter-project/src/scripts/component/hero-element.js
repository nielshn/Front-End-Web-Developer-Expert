class HeroElement extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' })

        const hero = document.createElement('section')
        hero.classList.add('hero')
        hero.innerHTML = `
        <slot></slot>`
        shadow.appendChild(hero)
        this._addStyles();
    }

    _addStyles() {
        const style = document.createElement('style')
        style.textContent = `
        :host {
          display: block;
        }
        .hero {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
          }
          img {
            width: 100%;
          }
          `
        this.shadowRoot.appendChild(style)
    }
}
customElements.define('hero-element', HeroElement)