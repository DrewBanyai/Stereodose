class SiteHeader {
    constructor(options) {
        this.options = options;
        this.headerHeight = { collapsed: "50px", expanded: "220px" };
        this.headerExpanded = false;
        this.buttons = { login: null, register: null };
        this.accountButtonBox = null;
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
                textAlign: "left",
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
                width: "66%",
                height: this.headerHeight.collapsed,
                display: "inline-flex",
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
                height: this.headerCollapsedHeight,
                display: "inline-flex",
                position: "relative",
                top: "-23px",
            },
        });
        container.appendChild(this.accountButtonBox.content);

        this.buttons.login = new Label({
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
                top: "20px",
                cursor: "pointer",
            },
            events: {
                click: () => {
                    if (!this.headerExpanded) { this.loginBox.setMode("login"); }
                    this.toggleExpandedHeader();
                }
            }
        });
        this.accountButtonBox.appendChild(this.buttons.login.content);

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
                top: "18px",
                userSelect: "none",
            },
        });
        this.accountButtonBox.appendChild(divider1.content);

        this.buttons.register = new Label({
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
                top: "20px",
                cursor: "pointer",
            },
            events: {
                click: () => {
                    if (!this.headerExpanded) { this.loginBox.setMode("register"); }
                    this.toggleExpandedHeader();
                }
            }
        });
        this.accountButtonBox.appendChild(this.buttons.register.content);
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
        
        this.loginBox.callbacks.login = () => { this.toggleExpandedHeader(); console.log("login"); };
        this.loginBox.callbacks.register = () => { this.toggleExpandedHeader(); console.log("register"); };
    }

    toggleExpandedHeader() { 
        this.headerExpanded = !this.headerExpanded;
        setStyle(this.content, { height: this.headerExpanded ? this.headerHeight.expanded : this.headerHeight.collapsed });

        //setStyle(this.accountButtonBox.content, { visibility: this.headerExpanded ? "hidden" : "visible" });
    }
}