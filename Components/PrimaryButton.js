class PrimaryButton {
	constructor(options) {
		this.options = options;
		this.ButtonElement = null;
		this.ButtonGradient = null;
		this.ButtonTextLabel = null;
		this.content = this.GenerateContent();

		//  Generic options application
		this.content.id = (options && options.id) ? options.id : "PrimaryButton";
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
		if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }

		this.ButtonTextLabel.SetText(this.content.value);
	}
	
	GenerateContent() {
		let highlightGradient = "linear-gradient(to right, rgba(200, 200, 200, 0.6), rgba(170, 170, 170, 0.4))";
		let mouseDownGradient = "linear-gradient(to right, rgba(140, 140, 140, 0.6), rgba(170, 170, 170, 0.4))";
		
		//  Create the main button, a rounded box
		this.ButtonElement = document.createElement("div");
		this.ButtonElement.id = this.options.id;
		this.ButtonElement.style.width = "200px";
		this.ButtonElement.style.height = "25px";
		this.ButtonElement.style.borderRadius = "5px";
		this.ButtonElement.style.backgroundImage = "linear-gradient(to right, rgb(255, 99, 0), rgb(255, 165, 0))";
		this.ButtonElement.style.display = "flex";
		
		this.ButtonGradient = document.createElement("div");
		this.ButtonGradient.id = this.options.id + "ButtonGradient";
		this.ButtonGradient.style.width = "100%";
		this.ButtonGradient.style.height = "100%";
		this.ButtonGradient.style.lineHeight = "25px";
		this.ButtonGradient.style.borderRadius = "5px";
		this.ButtonElement.style.display = "flex";
		this.ButtonElement.appendChild(this.ButtonGradient);
		
		//  Create a centered label on the button
		this.ButtonTextLabel = new Label(this.options.id + "ButtonText", "", "'Titillium Web', sans-serif", "", "div");
		this.ButtonTextLabel.content.style.position = "relative";
		this.ButtonTextLabel.content.style.margin = "auto";
		this.ButtonTextLabel.content.style.cursor = "default";
		this.ButtonTextLabel.content.style.userSelect = "none";
		this.ButtonTextLabel.content.style.textAlign = "center";
		this.ButtonGradient.appendChild(this.ButtonTextLabel.content);
		
		//  Set mouse reactions
		this.ButtonElement.onmouseover = () => { if (!this.ButtonElement.disabled) {  this.ButtonGradient.style.backgroundImage = highlightGradient; } }
		this.ButtonElement.onmouseout = () => { if (!this.ButtonElement.disabled) { this.ButtonGradient.style.backgroundImage = ""; } }
		this.ButtonElement.onmousedown = () => { if (!this.ButtonElement.disabled) {  this.ButtonGradient.style.backgroundImage = mouseDownGradient; } }
		this.ButtonElement.onmouseup = () => { if (!this.ButtonElement.disabled) { this.ButtonGradient.style.backgroundImage = highlightGradient; } }
		
		return this.ButtonElement;
	}
	
	SetText(text) { this.ButtonTextLabel.SetText(text); }
	SetFont(font) { this.ButtonTextLabel.SetFont(font); }
	SetFontSize(size) { this.ButtonTextLabel.SetFontSize(size); }
	
	SetOnClick(callback) { this.ButtonElement.onclick = () => { if (this.ButtonElement.disabled) { return; } callback(); }; }
	
	SetEnabledState(enabled) {
		this.ButtonElement.disabled = (!enabled);
		this.ButtonGradient.disabled = (!enabled);
		
		if (!enabled) { this.ButtonGradient.style.backgroundImage = ""; }
	}
}