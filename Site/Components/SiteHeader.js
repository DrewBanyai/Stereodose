class SiteHeader {
    constructor(options) {
        this.options = options;
        this.headerExpanded = false;
        this.loggedInUsernameLabel = null;
        this.accountButtons = { mainNavigation: null, loginRegister: null, loggedInAs: null };
        this.loginBox = null;
        this.content = this.generateContent();
        PostOffice.addAuthListener(this);
    }

    generateContent() {
        //  Create the main container and the centered header box
        let container = new Container({ id: "SiteHeader", style: styleTemplate.SiteHeader, });
        let centeredHeader = new Container({ id: "CenteredHeader", style: { margin: "auto", width: "920px", height: "100%", overflow: "hidden", }, });
        container.appendChild(centeredHeader.content);

        let siteNameBox = new Container({
            id: "SiteNameBox",
            style: { height: siteHeaderHeight.collapsed, display: "inline-flex", float: "left", cursor: "pointer", },
            events: { click: () => { LoadPage(new LandingPage({})); } }
        });
        centeredHeader.appendChild(siteNameBox.content);

        let rightHandButtonBox = new Container({ id: "RightHandButtonBox", style: { height: siteHeaderHeight.collapsed, float: "right", }, });
        centeredHeader.appendChild(rightHandButtonBox.content);
        
        this.loginInputMenu = new Container({ id: "LoginInputMenu", style: { textAlign: "right", position: "relative", top: siteHeaderHeight.collapsed, display: "none", }, });
        centeredHeader.appendChild(this.loginInputMenu.content);

        //  Load the different parts of the header menu
        this.loadSiteNameBox(siteNameBox);
        this.loadRightHandButtonBox(rightHandButtonBox);
        this.loadLoginInputMenu(this.loginInputMenu);

        return container.content;
    }

    async loadSiteNameBox(siteNameBox) {
        let siteTitleLabel1 = new Label({ id: "SiteNameLabel1", attributes: { value: "Stereodose ", }, style: styleTemplate.SiteTitleLabel1, });
        siteNameBox.appendChild(siteTitleLabel1.content);

        let siteNameLabel2 = new Label({ id: "SiteNameLabel2", attributes: { value: "Redux", }, style: styleTemplate.SiteTitleLabel2, });
        siteNameBox.appendChild(siteNameLabel2.content);
    }

    async loadRightHandButtonBox(rightHandButtonBox) {
        //  Make the main navigation box and fill it
        this.accountButtons.mainNavigation = new Container({ id: "MainNavigationBox", style: { height: siteHeaderHeight.collapsed, textAlign: "right", lineHeight: "22px", display: "none", position: "relative", top: "15px", }, });
        rightHandButtonBox.appendChild(this.accountButtons.mainNavigation.content);
        this.loadMainNavigationBox(this.accountButtons.mainNavigation);

        //  Make the login and register button box and fill it
        this.accountButtons.loginRegister = new Container({ id: "LoginAndRegisterButtonsBox", style: { height: siteHeaderHeight.collapsed, textAlign: "right", lineHeight: "22px", display: "inline-flex", position: "relative", top: "15px", }, });
        rightHandButtonBox.appendChild(this.accountButtons.loginRegister.content);
        this.loadLoginAndRegisterButtons(this.accountButtons.loginRegister);

        //  Make the account link button box and fill it
        this.accountButtons.loggedInAs = new Container({ id: "LoggedInAsLabel", style: { height: siteHeaderHeight.collapsed, textAlign: "right", lineHeight: "24px", display: "none" }, });
        rightHandButtonBox.appendChild(this.accountButtons.loggedInAs.content);
        this.loadAccountLinkButton(this.accountButtons.loggedInAs);

        this.loadAuthData();
    }

    async loadAuthData() {
        //  Get our authorization data, and act according to whether we are logged in
        let data = await PostOffice.getAuthentication();
        setStyle(this.accountButtons.mainNavigation.content, { display: data ? "inline-flex" : "none" });
        setStyle(this.accountButtons.loginRegister.content, { display: data ? "none" : "inline-flex" });
        setStyle(this.accountButtons.loggedInAs.content, { display: data ? "inline-flex" : "none" });
        this.loggedInUsernameLabel.setValue(data ? data.user.username.toLowerCase() : "");
        this.toggleExpandedHeader(data ? false : true);
    }

    authUpdate(data) { this.loadAuthData(); }

    async loadMainNavigationBox(mainNavigationBox) {
        let createPlaylistButton = new HeaderLink({ id: "CreatePlaylistButton", attributes: { value: "CREATE PLAYLIST", }, callback: (() => { LoadPage(new CreatePlaylist({})); }) });
        mainNavigationBox.appendChild(createPlaylistButton.content);

        mainNavigationBox.appendChild((new Label({ id: "Divider", attributes: { value: "|", }, style: styleTemplate.SiteHeaderMenuText, })).content);

        let accountButton = new HeaderLink({ id: "AccountButton", attributes: { value: "ACCOUNT", }, callback: (() => { LoadPage(new ViewAccount({})); }) });
        mainNavigationBox.appendChild(accountButton.content);

        mainNavigationBox.appendChild((new Label({ id: "Divider", attributes: { value: "|", }, style: styleTemplate.SiteHeaderMenuText, })).content);
    }

    async loadLoginAndRegisterButtons(loginAndRegisterButtonBox) {
        let loginButton = new Label({
            id: "LoginButton",
            attributes: { value: "LOGIN", },
            style: styleTemplate.SiteHeaderMenuButton,
            events: { click: () => { this.loginBox.setMode("login"); this.toggleExpandedHeader(); } },
        });
        loginAndRegisterButtonBox.appendChild(loginButton.content);

        let divider1 = new Label({ id: "Divider", attributes: { value: "|", }, style: styleTemplate.SiteHeaderMenuText, });
        loginAndRegisterButtonBox.appendChild(divider1.content);

        let registerButton = new Label({
            id: "RegisterButton",
            attributes: { value: "REGISTER", },
            style: styleTemplate.SiteHeaderMenuButton,
            events: { click: () => { this.loginBox.setMode("register"); this.toggleExpandedHeader(); } },
        });
        loginAndRegisterButtonBox.appendChild(registerButton.content);
    }

    async loadAccountLinkButton(accountLinkBox) {
        let loggedInAsLabel = new Label({ id: "LoggedInAsLabel", attributes: { value: "Logged in as: " }, style: styleTemplate.LoggedInAsText, });
        accountLinkBox.appendChild(loggedInAsLabel.content);

        this.loggedInUsernameLabel = new Label({
            id: "LoggedInUsernameLabel",
            attributes: { value: "UNKNOWN" },
            style: styleTemplate.LoggedInUsernameText,
            events: { click: () => { this.logout(); }}
        });
        accountLinkBox.appendChild(this.loggedInUsernameLabel.content);
    }

    async loadLoginInputMenu(loginInputMenu) {
        this.loginBox = new LoginBox({});
        loginInputMenu.appendChild(this.loginBox.content);
    }

    async logout() {
        LoadPage(new LandingPage({}));
        PostOffice.nullAuthentication();
    }

    async toggleExpandedHeader(open) { 
        this.headerExpanded = (open !== undefined) ? open : !this.headerExpanded;
        setStyle(this.loginInputMenu.content, { display: "" });
        setStyle(this.content, { height: this.headerExpanded ? siteHeaderHeight.expanded : siteHeaderHeight.collapsed });
    }
}