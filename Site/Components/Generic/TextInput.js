class TextInput {
    constructor(options) {
        this.options = options;
        this.callbacks = { return: null };
        this.content = this.generateContent();

		//  Generic options application
		this.content.id = (options && options.id) ? options.id : "TextInput";
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
		if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
    }

    generateContent() {
        let inputType = (this.options && this.options.type) ? this.options.type : "text";

        let container = document.createElement("input");
        container.setAttribute("type", inputType);

        container.addEventListener("keyup", (e) => { if ((e.keyCode === 13) && (this.callbacks.return)) { this.callbacks.return(); } })

        container.style.backgroundColor = "white";
        container.style.color = "black";

        return container;
    }

    getValue() { return this.content.value; }
    setValue(value) { this.content.value = value; }
}