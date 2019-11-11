class AddTrackLinkPopup {
    constructor(options) {
        this.options = options;
        this.trackData = { link: null, data: null };
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: "PopupWindow",
            style: {
                width: "600px",
                height: "116px",
                backgroundColor: "rgb(50, 50, 70)",
                borderRadius: "8px",
                border: "1px solid rgb(200, 200, 200)",
            },
        });

        let topLabel = new Label({
            id: "TopLabel",
            attributes: { value: "Add a track link (Soundcloud URL):" },
            style: {
                padding: "10px 0px 0px 10px",
                fontFamily: "Open Sans",
                fontSize: "16px",
                fontWeight: "bold",
                color: "rgb(255, 255, 255)",
            }
        });
        container.appendChild(topLabel.content);

        let setLinkStatus = null;

		let linkInput = null; linkInput = new TextInput({
            id: "LinkInput",
            attributes: { value: "" },
            style: {
                margin: "10px 0px 0px 10px",
                width: "576px",
                height: "20px",
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "14px",
                fontWeight: "bold",
                color: "rgb(64, 64, 64)",
                borderRadius: "6px",
            },
            events: {
                keyup: async () => {
                    let trackData = null;
                    let trackLink = linkInput.getValue();
                    try { trackData = await SC.resolve(this.getFormattedVersionOfURL(trackLink)); } catch (error) {};
                    if (!trackData) { if (setLinkStatus) { setLinkStatus(false); return; } }
                    this.trackData = { link: trackLink, data: trackData };
                    setLinkStatus(true);
                }
            }
        });
        container.appendChild(linkInput.content);
        
        let statusLabel = new Label({
            id: "StatusLabel",
            attributes: { value: "Waiting for link URL..." },
            style: {
                padding: "2px 0px 0px 10px",
                fontFamily: "Open Sans",
                fontSize: "12px",
                fontWeight: "bold",
                color: "rgb(160, 215, 160)",
            }
        });
        container.appendChild(statusLabel.content);

        let submitButton = new PrimaryButton({
            id: "SubmitButton",
            attributes: { value: "Submit" },
            style: { margin: "10px auto", width: "580px", display: "none", },
            events: {
                click: () => {
                    if (this.options && this.options.submissionCallback) { this.options.submissionCallback(this.trackData.link, this.trackData.data); }
                    if (this.content.closeDialog) { this.content.closeDialog(); }
                }
            }
        });
        container.appendChild(submitButton.content);

        setLinkStatus = (status) => {
            statusLabel.setValue(status ? "" : "Link failed verification...");
            setStyle(submitButton.content, { display: (status ? "" : "none"), });
            setStyle(statusLabel.content, { color: (status ? "" : "rgb(215, 160, 160)"), display: (status ? "none" : "") });
        };

        return (new Modal({ id: "AddTrackLinkPopup", topOverride: "30%", content: container.content })).content;
    }

	getFormattedVersionOfURL(url) {
		if (url.substr(0, 10) === "soundcloud") { return "https://" + url; }
		if (url.substr(0, 7) === "http://") { console.log("https://" + url.substr(7, url.length - 7)); return "https://" + url.substr(7, url.length - 7); }
		return url;
	}
}