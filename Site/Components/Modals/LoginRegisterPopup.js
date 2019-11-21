class LoginRegisterPopup {
    constructor(options) {
        this.options = options;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: "PopupWindow",
            style: {
                width: "240px",
                height: "185px",
                backgroundColor: "rgb(50, 50, 50)",
                borderRadius: "8px",
                border: "1px solid rgb(200, 200, 200)",
            },
        });

        let loginBox = new LoginBox({ submissionCallback: this.options.submissionCallback });
        loginBox.setMode(this.options.login ? "login" : "register");
        loginBox.closeDialog = () => { this.content.closeDialog(); }
        container.appendChild(loginBox.content);

        return (new Modal({ id: "LoginRegisterPopup", topOverride: "30%", content: container.content })).content;
    }
}