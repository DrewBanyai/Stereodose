class Label {
	constructor(options) {
		this.options = options;
		this.content = this.GenerateContent();
		this.setText(this.content.value);
	}
	
	GenerateContent() {
		if (!this.options.id) { this.options.id = "Label"; }

		let container = new Container(this.options);
		container.content.setText = (text) => this.setText(text);
		return container.content;
	}
	
	setText(text) { this.content.innerHTML = text; }
	setFont(font) { this.content.style.fontFamily = font; }
	setFontSize(size) { this.content.style.fontSize = size; }
	setColor(color) { this.content.style.color = color; }
}