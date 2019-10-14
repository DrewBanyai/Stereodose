class SiteHeader {
    constructor(options) {
        this.options = options;
        this.headerHeight = { collapsed: "50px", expanded: "220px" };
        this.headerExpanded = false;
        this.accountButtonBox = null;
        this.loggedInUsernameLabel = null;
        this.accountButtons = { loginRegister: null, accountData: null };
        this.loginBox = null;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: "SiteHeader",
            style: {
                width: "100%",
                height: this.headerHeight.collapsed,
                margin: "0px 0px 20px 0px",
                textAlign: "center",
                backgroundColor: "rgb(64, 64, 64)",
                backgroundImage: "linear-gradient(to right bottom, rgb(10, 10, 10), rgb(50, 50, 50))",
                borderBottom: "1px solid rgba(160, 160, 160, 0.4)",
                transition: "height 0.5s"
            }
        });

        let centeredHeader = new Container({
            id: "CenteredHeader",
            style: {
                margin: "auto",
                width: "920px",
                height: "100%",
                overflow: "hidden",
            },
        });
        container.appendChild(centeredHeader.content);

        this.loadSiteNameBox(centeredHeader);
        this.loadAccountButtonBox(centeredHeader);
        this.loadLoginInputMenu(centeredHeader);

        return container.content;
    }

    loadSiteNameBox(container) {
        let siteNameBox = new Container({
            id: "SiteNameBox",
            style: {
                height: this.headerHeight.collapsed,
                display: "inline-flex",
                position: "relative",
                left: "-203px",
                top: "0px",
            },
        });
        container.appendChild(siteNameBox.content);

        let siteNameLabel1 = new Label({
            id: "SiteNameLabel1",
            attributes: { value: "Stereodose ", },
            style: {
                fontFamily: "Open Sans Condensed",
                fontSize: "34px",
                padding: "2px 0px 0px 0px",
                color: "rgb(140, 140, 140)",
                display: "inline-flex",
                userSelect: "none",
            },
        });
        siteNameBox.appendChild(siteNameLabel1.content);

        let siteNameLabel2 = new Label({
            id: "SiteNameLabel2",
            attributes: { value: "Redux", },
            style: {
                fontFamily: "Open Sans Condensed",
                fontSize: "34px",
                padding: "2px 0px 0px 8px",
                color: "rgb(100, 120, 130)",
                display: "inline-flex",
                userSelect: "none",
            },
        });
        siteNameBox.appendChild(siteNameLabel2.content);
    }

    loadAccountButtonBox(container) {
        this.accountButtonBox = new Container({
            id: "AccountButtonBox",
            style: {
                width: "34%",
                height: this.headerHeight.collapsed,
                display: "inline-flex",
                float: "right",
            },
        });
        container.appendChild(this.accountButtonBox.content);

        //  Make the login and register button box and fill it
        this.accountButtons.loginRegister = new Container({
            id: "LoginAndRegisterButtonsBox",
            style: { width: "100%", height: this.headerHeight.collapsed, display: "inline-flex", textAlign: "right", display: "" },
        });
        this.accountButtonBox.appendChild(this.accountButtons.loginRegister.content);
        this.loadLoginAndRegisterButtons(this.accountButtons.loginRegister);

        //  Make the account link button box and fill it
        this.accountButtons.accountData = new Container({
            id: "AccountLinkBox",
            style: { width: "100%", height: this.headerHeight.collapsed, display: "inline-flex", textAlign: "right", display: "none" },
        });
        this.accountButtonBox.appendChild(this.accountButtons.accountData.content);
        this.loadAccountLinkButton(this.accountButtons.accountData);
    }

    loadLoginAndRegisterButtons(loginAndRegisterButtonBox) {
        let loginButton = new Label({
            id: "LoginButton",
            attributes: { value: "LOGIN", },
            style: {
                margin: "0px 0px 0px auto",
                fontFamily: "Open Sans",
                fontSize: "14px",
                padding: "0px 0px 0px 0px",
                color: "rgb(140, 140, 140)",
                display: "inline-flex",
                position: "relative",
                top: "15px",
                cursor: "pointer",
            },
            events: {
                click: () => {
                    if (!this.headerExpanded) { this.loginBox.setMode("login"); }
                    this.toggleExpandedHeader();
                }
            }
        });
        loginAndRegisterButtonBox.appendChild(loginButton.content);

        let divider1 = new Label({
            id: "LoginToRegisterDivider",
            attributes: { value: "|", },
            style: {
                margin: "0px 10px 0px 10px",
                fontFamily: "Open Sans",
                fontSize: "16px",
                padding: "0px 0px 0px 0px",
                color: "rgba(140, 140, 140, 0.4)",
                display: "inline-flex",
                position: "relative",
                top: "14px",
                userSelect: "none",
            },
        });
        loginAndRegisterButtonBox.appendChild(divider1.content);

        let registerButton = new Label({
            id: "RegisterButton",
            attributes: { value: "REGISTER", },
            style: {
                margin: "0px 0px 0px 0px",
                fontFamily: "Open Sans",
                fontSize: "14px",
                padding: "0px 0px 0px 0px",
                color: "rgb(140, 140, 140)",
                display: "inline-flex",
                position: "relative",
                top: "15px",
                cursor: "pointer",
            },
            events: {
                click: () => {
                    if (!this.headerExpanded) { this.loginBox.setMode("register"); }
                    this.toggleExpandedHeader();
                }
            }
        });
        loginAndRegisterButtonBox.appendChild(registerButton.content);
    }

    loadAccountLinkButton(accountLinkBox) {
        let accountLinkButton = new Container({
            id: "AccountLinkButton",
            style: {
                height: "28px",
                margin: "10px 0px 0px 0px",
                padding: "0px 5px 0px 5px",
                lineHeight: "0px",
                borderRadius: "8px",
                border: "1px solid rgba(200, 200, 200, 0.4)",
                float: "right",
            },
        });
        accountLinkBox.appendChild(accountLinkButton.content);

        let loggedInAsLabel = new Label({
            id: "LoggedInAsLabel",
            attributes: { value: "Logged in as: " },
            style: {
                margin: "0px 0px 0px 0px",
                fontFamily: "Open Sans",
                fontSize: "14px",
                padding: "0px 0px 0px 0px",
                color: "rgb(140, 140, 140)",
                display: "inline-flex",
                position: "relative",
                top: "15px",
            },
        });
        accountLinkButton.appendChild(loggedInAsLabel.content);

        this.loggedInUsernameLabel = new Label({
            id: "LoggedInUsernameLabel",
            attributes: { value: "korberos" },
            style: {
                margin: "0px 0px 0px 6px",
                fontFamily: "Open Sans",
                fontSize: "14px",
                padding: "0px 0px 0px 0px",
                color: "rgb(180, 180, 180)",
                display: "inline-flex",
                position: "relative",
                top: "15px",
            },
        });
        accountLinkButton.appendChild(this.loggedInUsernameLabel.content);
    }

    loadLoginInputMenu(container) {
        let loginInputMenu = new Container({
            id: "LoginInputMenu",
            style: {
                width: "100%",
                textAlign: "right",
            },
        });
        container.appendChild(loginInputMenu.content);

        this.loginBox = new LoginBox({});
        loginInputMenu.appendChild(this.loginBox.content);
        
        this.loginBox.callbacks.login = (username) => {
            username = username.toLowerCase();
            this.accountButtons.loginRegister.content.style.display = "none";
            this.accountButtons.accountData.content.style.display = "";
            this.loggedInUsernameLabel.setValue(username);
            this.toggleExpandedHeader();
        };
        this.loginBox.callbacks.register = this.loginBox.callbacks.login;
    }

    toggleExpandedHeader() { 
        this.headerExpanded = !this.headerExpanded;
        setStyle(this.content, { height: this.headerExpanded ? this.headerHeight.expanded : this.headerHeight.collapsed });

        //setStyle(this.accountButtonBox.content, { visibility: this.headerExpanded ? "hidden" : "visible" });
    }
}