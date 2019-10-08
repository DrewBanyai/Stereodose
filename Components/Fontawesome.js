class Fontawesome {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "FontAwesome",
            attributes: {
                className: (this.options && this.options.className) ? this.options.className : "",
            },
            style: {
                containerType: "i",
                userSelect: "none",
            }
        });
        container.applyOptions(this.options);

        return container.content;
    }

    setSymbol(className) { this.content.className = className; }
}