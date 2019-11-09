class PlaylistFilterButton {
    constructor(options)  {
        this.options = options;
        this.content = this.generateContent();
    }

    generateContent() {
        if (!this.options) { console.warn("Attempted to create a PlaylistFilterButton without any options"); return null; }
        if (!this.options.text) { console.warn("Attempted to create a PlaylistFilterButton without any text option"); return null; }
        if (!this.options.callback) { console.warn("Attempted to create a PlaylistFilterButton without any callback option"); return null; }

        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "PlaylistFilterButton",
            style: {
                margin: "0px 3px 0px 3px",
                padding: "6px 11px 6px 11px",
                borderRadius: "4px",
                backgroundColor: "rgb(0, 0, 0)",
                cursor: "pointer",
                display: "inline-block",
            },
            events: {
                click: () => { if (this.options.callback) { this.options.callback(); } },
            }
        });

        let label = new Label({
            id: ((this.options && this.options.id) ? this.options.id : "PlaylistFilterButton") + "TextLabel",
            attributes: { value: this.options.text },
            style: {
                fontFamily: "'Staatliches', sans-serif",
                fontSize: "15px",
                color: "rgb(255, 255, 255)",
            }
        });
        container.appendChild(label.content);

        return container.content;
    }
}