class SiteHeader {
    constructor(options) {
        this.options = options;
        this.headerExpanded = false;
        this.rightHandButtonBox = null;
        this.loggedInUsernameLabel = null;
        this.accountButtons = { mainNavigation: null, loginRegister: null, loggedInAs: null };
        this.loginBox = null;
        this.content = this.generateContent();
    }

    generateContent() {
        //  Create the main container and the centered header box
        let container = new Container({ id: "SiteHeader", style: styleTemplate.SiteHeader, });
        let centeredHeader = new Container({ id: "CenteredHeader", style: { margin: "auto", width: "920px", height: "100%", overflow: "hidden", }, });
        container.appendChild(centeredHeader.content);

        //  Load the different parts of the header menu
        this.loadSiteNameBox(centeredHeader);
        this.loadRightHandButtonBox(centeredHeader);
        this.loadLoginInputMenu(centeredHeader);

        return container.content;
    }

    loadSiteNameBox(container) {
        let siteNameBox = new Container({ id: "SiteNameBox", style: { height: siteHeaderHeight.collapsed, display: "inline-flex", float: "left", }, });
        container.appendChild(siteNameBox.content);

        let siteTitleLabel1 = new Label({ id: "SiteNameLabel1", attributes: { value: "Stereodose ", }, style: styleTemplate.SiteTitleLabel1, });
        siteNameBox.appendChild(siteTitleLabel1.content);

        let siteNameLabel2 = new Label({ id: "SiteNameLabel2", attributes: { value: "Redux", }, style: styleTemplate.SiteTitleLabel2, });
        siteNameBox.appendChild(siteNameLabel2.content);
    }

    loadRightHandButtonBox(container) {
        this.rightHandButtonBox = new Container({ id: "RightHandButtonBox", style: { height: siteHeaderHeight.collapsed, float: "right", }, });
        container.appendChild(this.rightHandButtonBox.content);

        //  Make the main navigation box and fill it
        this.accountButtons.mainNavigation = new Container({ id: "MainNavigationBox", style: { height: siteHeaderHeight.collapsed, textAlign: "right", lineHeight: "22px", display: "none" }, });
        this.rightHandButtonBox.appendChild(this.accountButtons.mainNavigation.content);
        this.loadMainNavigationBox(this.accountButtons.mainNavigation);

        //  Make the login and register button box and fill it
        this.accountButtons.loginRegister = new Container({ id: "LoginAndRegisterButtonsBox", style: { height: siteHeaderHeight.collapsed, textAlign: "right", lineHeight: "22px", display: "inline-flex" }, });
        this.rightHandButtonBox.appendChild(this.accountButtons.loginRegister.content);
        this.loadLoginAndRegisterButtons(this.accountButtons.loginRegister);

        //  Make the account link button box and fill it
        this.accountButtons.loggedInAs = new Container({ id: "LoggedInAsLabel", style: { height: siteHeaderHeight.collapsed, textAlign: "right", lineHeight: "24px", display: "none" }, });
        this.rightHandButtonBox.appendChild(this.accountButtons.loggedInAs.content);
        this.loadAccountLinkButton(this.accountButtons.loggedInAs);
    }

    loadMainNavigationBox(mainNavigationBox) {
        let createPlaylistButton = new Label({
            id: "CreatePlatlistButton",
            attributes: { value: "CREATE PLAYLIST", },
            style: styleTemplate.SiteHeaderMenuButton,
            events: { click: () => { LoadPage(new CreatePlaylist()); } },
        });
        mainNavigationBox.appendChild(createPlaylistButton.content);

        let divider1 = new Label({ id: "Divider", attributes: { value: "|", }, style: styleTemplate.SiteHeaderMenuText, });
        mainNavigationBox.appendChild(divider1.content);
    }

    loadLoginAndRegisterButtons(loginAndRegisterButtonBox) {
        let loginButton = new Label({
            id: "LoginButton",
            attributes: { value: "LOGIN", },
            style: styleTemplate.SiteHeaderMenuButton,
            events: { click: () => { this.loginBox.setMode("login"); this.toggleExpandedHeader(true); } },
        });
        loginAndRegisterButtonBox.appendChild(loginButton.content);

        let divider1 = new Label({ id: "Divider", attributes: { value: "|", }, style: styleTemplate.SiteHeaderMenuText, });
        loginAndRegisterButtonBox.appendChild(divider1.content);

        let registerButton = new Label({
            id: "RegisterButton",
            attributes: { value: "REGISTER", },
            style: styleTemplate.SiteHeaderMenuButton,
            events: { click: () => { this.loginBox.setMode("register"); this.toggleExpandedHeader(true); } },
        });
        loginAndRegisterButtonBox.appendChild(registerButton.content);
    }

    loadAccountLinkButton(accountLinkBox) {
        let loggedInAsLabel = new Label({ id: "LoggedInAsLabel", attributes: { value: "Logged in as: " }, style: styleTemplate.LoggedInAsText, });
        accountLinkBox.appendChild(loggedInAsLabel.content);

        this.loggedInUsernameLabel = new Label({
            id: "LoggedInUsernameLabel",
            attributes: { value: "korberos" },
            style: styleTemplate.LoggedInUsernameText,
        });
        accountLinkBox.appendChild(this.loggedInUsernameLabel.content);
    }

    loadLoginInputMenu(container) {
        this.loginInputMenu = new Container({ id: "LoginInputMenu", style: { textAlign: "right", position: "relative", top: siteHeaderHeight.collapsed, display: "none", }, });
        container.appendChild(this.loginInputMenu.content);

        this.loginBox = new LoginBox({});
        this.loginInputMenu.appendChild(this.loginBox.content);
        
        this.loginBox.callbacks.login = (username) => {
            setStyle(this.accountButtons.mainNavigation.content, { display: "inline-flex" });
            setStyle(this.accountButtons.loggedInAs.content, { display: "inline-flex" });
            setStyle(this.accountButtons.loginRegister.content, { display: "none" });
            this.loggedInUsernameLabel.setValue(username.toLowerCase());
            this.toggleExpandedHeader(false);
        };
        this.loginBox.callbacks.register = this.loginBox.callbacks.login;
    }

    toggleExpandedHeader(open) { 
        this.headerExpanded = open;
        setStyle(this.loginInputMenu.content, { display: "" });
        setStyle(this.content, { height: this.headerExpanded ? siteHeaderHeight.expanded : siteHeaderHeight.collapsed });
    }
}