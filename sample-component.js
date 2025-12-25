class SVG_DISPLAY extends HTMLElement {
    constructor() {
        super();

        this.Loaded;
    }

    connectedCallback() {
        if(!this.Loaded)
            this.LoadImage();
    }

    async LoadImage() {
        let src = this.getAttribute('src');

        const res = await fetch(src);

        const textTemplate = await res.text();

        this.classList.add('chirp-illustration');

        this.appendChild(new DOMParser().parseFromString(textTemplate, 'text/html').querySelector('svg'));
        
        this.Loaded = true;
    }
}

customElements.define('svg-display', SVG_DISPLAY);
