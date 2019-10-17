class ViewAccount {
	constructor(options) {
		this.options = options;
		this.subPages = { info: null, playlists: null, favorites: null };
		this.content = this.GenerateContent();
		this.showSubPage("info");
	}
	
	GenerateContent() {
		let container = new Container({ id: "ViewAccountContainer", style: { width: "920px", height: "100%", margin: "auto", textAlign: "left", } });

		let accountViewLabel = new Label({ id: "AccountViewLabel", attributes: { value: "View Account" }, style: styleTemplate.PageTitle, });
		container.appendChild(accountViewLabel.content);

		container.appendChild(this.createAccountSubPageButtons());
		container.appendChild(this.createSubPages());

		return container.content;
	}

	determineAccount() {
		let optionsUsername = (this.options && this.options.username) ? this.options.username : null;
		let auth = PostOffice.getAuthorization();
		let username = optionsUsername ? optionsUsername : (auth.username ? auth.username : "UNKNOWN");
		return username;
	}

	createAccountSubPageButtons() {
		let accountSubpageButtons = new Container({ id: "AccountSubPageButtons", style: { margin: "0px 0px 20px 0px" } });

        let infoSubpageButton = new HeaderLink({ id: "InfoSubpageButton", attributes: { value: "INFORMATION", }, callback: (() => { this.showSubPage("info"); }) });
        accountSubpageButtons.appendChild(infoSubpageButton.content);

        accountSubpageButtons.appendChild((new Label({ id: "Divider", attributes: { value: "|", }, style: styleTemplate.SiteHeaderMenuText, })).content);

        let playlistsButton = new HeaderLink({ id: "PlaylistsButton", attributes: { value: "PLAYLISTS", }, callback: (() => { this.showSubPage("playlists"); }) });
        accountSubpageButtons.appendChild(playlistsButton.content);

        accountSubpageButtons.appendChild((new Label({ id: "Divider", attributes: { value: "|", }, style: styleTemplate.SiteHeaderMenuText, })).content);

        let favoritesButton = new HeaderLink({ id: "FavoritesButton", attributes: { value: "FAVORITES", }, callback: (() => { this.showSubPage("favorites"); }) });
        accountSubpageButtons.appendChild(favoritesButton.content);

		return accountSubpageButtons.content;
	}

	createSubPages() {
		let subPagesBox = new Container({ id: "SubPagesBox", style: { fontFamily: "'Titillium Web', sans-serif", fontSize: "16px", color: "rgb(200, 200, 200)", fontWeight: "500",} });

		subPagesBox.appendChild(this.createInformationSubpage());
		subPagesBox.appendChild(this.createPlaylistsSubpage());
		subPagesBox.appendChild(this.createFavoritesSubpage());

		return subPagesBox.content;
	}

	createInformationSubpage() {
		this.subPages.info = new Container({ id: "InformationSubPage", style: { display: "none" }, });

		let accountUsernameLabel = new Label({ id: "AccountUsernameLabel", attributes: { value: `Username: ${this.determineAccount()}` } });
		this.subPages.info.appendChild(accountUsernameLabel.content);

		return this.subPages.info.content;
	}

	createPlaylistsSubpage() {
		this.subPages.playlists = new Container({ id: "PlaylistsSubPage", style: { display: "none" }, });

		this.loadMyPlaylists(this.subPages.playlists);

		return this.subPages.playlists.content;
	}

	async loadMyPlaylists(listContainer) {
		let result = await PostOffice.PlaylistListMine();
		if (!result || !result.success) { console.warn("Failed to retrieve your playlists"); return; }

		for (let key in result.playlists) { listContainer.appendChild((new PlaylistDisplay({ data: result.playlists[key] })).content); }
	}

	createFavoritesSubpage() {
		this.subPages.favorites = new Container({ id: "FavoritesSubPage", style: { display: "none" }, });

		return this.subPages.favorites.content;
	}

	showSubPage(subPage) {
		if (!this.subPages.hasOwnProperty(subPage) || !this.subPages[subPage]) { console.warn("Attempted to go to a sub-page that does not exist:", subPage); return; }
		for (let key in this.subPages) { if (this.subPages[key]) { this.subPages[key].content.style.display = "none"; } }
		this.subPages[subPage].content.style.display = "block";
	}
}