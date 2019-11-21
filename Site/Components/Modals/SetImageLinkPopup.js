class SetImageLinkPopup {
    constructor(options) {
        this.options = options;
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
            attributes: { value: "Choose a thumbnail (input URL):" },
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
                    let imageData = await loadImageToBase64(linkInput.getValue());
                    if (!imageData) { if (setLinkStatus) { setLinkStatus(false); return; } }
                    setLinkStatus(true);
                    //  TODO: Callback
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
                    if (this.options && this.options.submissionCallback) { this.options.submissionCallback(linkInput.getValue()); }
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

        return (new Modal({ id: "SetImageLinkPopup", topOverride: "30%", content: container.content })).content;
    }
}