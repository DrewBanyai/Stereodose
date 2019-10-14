class LoginBox {
    constructor(options) {
        this.options = options;
        this.mode = "login";
        this.callbacks = { login: null, register: null }
        this.elements = { usernameInput: null, passwordInput: null, submitButton: null };
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: "LoginBox",
            style: {
                width: "200px",
                height: "170px",
                margin: "0px 0px 0px auto",
                position: "relative",
            },
        });

        let loginUsernameLabel = new Label({
            id: "LoginUsernameLabel",
            attributes: { value: "Username:" },
            style: {
                margin: "10px 0px 0px 0px",
                fontFamily: "Open Sans",
                fontSize: "14px",
                padding: "0px 0px 0px 0px",
                color: "rgb(140, 140, 140)",
                float: "left",
                position: "relative",
                top: "-54px",
            }
        });
        container.appendChild(loginUsernameLabel.content);

        this.elements.usernameInput = new TextInput({
            id: "LoginInputUsername",
            style: {
                width: "200px",
                height: "26px",
                margin: "0px 0px 0px auto",
                fontFamily: "Open Sans",
                fontWeight: "bold",
                display: "block",
                position: "relative",
                top: "-54px",
            },
        });
        container.appendChild(this.elements.usernameInput.content);

        let loginPasswordLabel = new Label({
            id: "LoginPasswordLabel",
            attributes: { value: "Password:" },
            style: {
                margin: "10px 0px 0px 0px",
                fontFamily: "Open Sans",
                fontSize: "14px",
                padding: "0px 0px 0px 0px",
                color: "rgb(140, 140, 140)",
                float: "left",
                position: "relative",
                top: "-54px",
            }
        });
        container.appendChild(loginPasswordLabel.content);

        this.elements.passwordInput = new TextInput({
            id: "LoginInputPassword",
            type: "password",
            style: {
                width: "200px",
                height: "26px",
                margin: "0px 0px 0px auto",
                fontFamily: "Open Sans",
                fontWeight: "bold",
                display: "block",
                position: "relative",
                top: "-54px",
            },
        });
        container.appendChild(this.elements.passwordInput.content);

        this.elements.submitButton = new PrimaryButton({
            id: "SubmitButton",
            attributes: { value: "LOGIN" },
            style: {
                width: "200px",
                height: "24px",
                margin: "12px 0px 0px 0px",
                fontFamily: "Open Sans Condensed",
                fontSize: "12px",
                position: "relative",
                top: "-54px",
            },
            events: {
                click: async () => { await this.submitData(); },
            }
        });
        container.appendChild(this.elements.submitButton.content);
        
        this.elements.usernameInput.callbacks.return = async () => { await this.submitData(); }; 
        this.elements.passwordInput.callbacks.return = async () => { await this.submitData(); }; 

        return container.content;
    }

    async submitData() {
        let postFunc = (this.mode === "login") ? PostOffice.UserLogin  : PostOffice.UserRegister;
        let result = await postFunc(this.elements.usernameInput.content.value, this.elements.passwordInput.content.value);
        if (!result) { console.warn(`Failed to return any result when attempting to ${this.mode}`); return; }
        if (result.success) {
            if (!this.mode || !this.callbacks.hasOwnProperty(this.mode) || !this.callbacks[this.mode]) { return; }
            this.callbacks[this.mode](this.elements.usernameInput.getValue());
            this.elements.usernameInput.setValue("");
            this.elements.passwordInput.setValue("");
        }
        else { console.log("Failed:", result.message); }
    }

    setMode(mode) {
        if (!["login", "register"].includes(mode)) { console.log("Attempted to switch LoginBox to unknown mode:", mode); return; }
        this.mode = mode;
        
        this.elements.submitButton.setValue(mode.toUpperCase());
    }
}