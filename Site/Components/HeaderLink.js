class HeaderLink {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();
    }

    generateContent() {
        let link = new Label({
            id: (this.options && this.options.id) ? this.options.id : "HeaderLink",
            attributes: { value: (this.options && this.options.attributes && this.options.attributes.value) ? this.options.attributes.value : "HEADER LINK", },
            style: styleConfig.SiteHeaderMenuButton,
            events: {
                click: () => { if (this.options && this.options.callback) { this.options.callback() } },
                mouseover: (e) => { e.currentTarget.style.color = "rgb(180, 180, 180)"; },
                mouseout: (e) => { e.currentTarget.style.color = "rgb(140, 140, 140)"; },
            },
        });
        return link.content;
    }
}