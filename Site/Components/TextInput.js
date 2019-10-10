class TextInput {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();

		//  Generic options application
		this.content.id = (options && options.id) ? options.id : "TextInput";
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
		if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
    }

    generateContent() {
        let container = document.createElement("input");
        container.setAttribute("type", "text");

        return container;
    }

    setValue(value) {
        this.content.value = value;
    }
}