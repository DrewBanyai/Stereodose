class Modal {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "Modal",
            style: {
                width: "100%",
                height: "100%",
                position: "fixed",
                left: "0px",
                top: "0px",
                right: "0px",
                bottom: "0px",
                zIndex: "1",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
        });

        return container.content;
    }

    appendChild(child) { this.content.appendChild(child); }
}