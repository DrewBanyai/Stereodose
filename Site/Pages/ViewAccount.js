class ViewAccount {
	constructor(options) {
		this.options = options;
		this.subPages = { info: null, playlists: null, favorites: null };
		this.content = this.GenerateContent();
		this.showSubPage("info");
	}
	
	GenerateContent() {
		let container = new Container({ id: "ViewAccountContainer", style: { width: "920px", height: "100%", margin: "auto", textAlign: "left", } });

		let pageTitleLabel = new Label({ id: "AccountViewLabel", attributes: { value: "View Account" }, style: styleConfig.PageTitle, });
		container.appendChild(pageTitleLabel.content);

		container.appendChild(this.createAccountSubPageButtons());
		container.appendChild(this.createSubPages());

		return container.content;
	}

	async determineAccount() {
		let optionsUsername = (this.options && this.options.username) ? this.options.username : null;
		let auth = await PostOffice.getAuthentication();
		let username = optionsUsername ? optionsUsername : (auth ? auth.user.username : "UNKNOWN");
		return username;
	}

	createAccountSubPageButtons() {
		let accountSubpageButtons = new Container({ id: "AccountSubPageButtons", style: { margin: "0px 0px 20px 0px" } });

        let infoSubpageButton = new HeaderLink({ id: "InfoSubpageButton", attributes: { value: "INFORMATION", }, callback: (() => { this.showSubPage("info"); }) });
        accountSubpageButtons.appendChild(infoSubpageButton.content);

        accountSubpageButtons.appendChild((new Label({ id: "Divider", attributes: { value: "|", }, style: styleConfig.SiteHeaderMenuText, })).content);

        let playlistsButton = new HeaderLink({ id: "PlaylistsButton", attributes: { value: "PLAYLISTS", }, callback: (() => { this.showSubPage("playlists"); }) });
        accountSubpageButtons.appendChild(playlistsButton.content);

        accountSubpageButtons.appendChild((new Label({ id: "Divider", attributes: { value: "|", }, style: styleConfig.SiteHeaderMenuText, })).content);

        let favoritesButton = new HeaderLink({ id: "FavoritesButton", attributes: { value: "FAVORITES", }, callback: (() => { this.showSubPage("favorites"); }) });
        accountSubpageButtons.appendChild(favoritesButton.content);

		return accountSubpageButtons.content;
	}

	createSubPages() {
		let subPagesBox = new Container({ id: "SubPagesBox", style: { fontFamily: "'Titillium Web', sans-serif", fontSize: "16px", color: "rgb(200, 200, 200)", fontWeight: "500",} });

		subPagesBox.appendChild(this.createInformationSubpage());
		subPagesBox.appendChild(this.createPlaylistsSubpage());
		subPagesBox.appendChild(this.createFavoritesSubpage());
		PostOffice.addAuthListener(this);

		return subPagesBox.content;
	}

	createInformationSubpage() {
		this.subPages.info = new Container({ id: "InformationSubPage", style: { display: "none" }, });

		this.addInfoSubPageNameLabel();

		return this.subPages.info.content;
	}

	async addInfoSubPageNameLabel() {
		let accountUsernameLabel = new Label({ id: "AccountUsernameLabel", attributes: { value: `Username: ${await this.determineAccount()}` } });
		this.subPages.info.appendChild(accountUsernameLabel.content);
	}

	createPlaylistsSubpage() {
		this.subPages.playlists = new Container({ id: "PlaylistsSubPage", style: { display: "none" }, });

		this.loadMyPlaylists();

		return this.subPages.playlists.content;
	}

	async loadMyPlaylists() {
		let playlists = await PostOffice.PlaylistListMine();
		if (!playlists) { console.warn("Failed to retrieve your playlists"); return; }

		clearChildren(this.subPages.playlists.content);
		for (let key in playlists) { this.subPages.playlists.appendChild((new PlaylistDisplay({ data: playlists[key], mode: "ViewAccount" })).content); }
	}

	createFavoritesSubpage() {
		this.subPages.favorites = new Container({ id: "FavoritesSubPage", style: { display: "none" }, });

		this.loadMyFavorites(this.subPages.favorites);

		return this.subPages.favorites.content;
	}

	async loadMyFavorites() {
		let favorites = await PostOffice.PlaylistListFavorites();
		if (!favorites) { console.warn("Failed to retrieve your favorites"); return; }

		let favoriteIDList = [];
		clearChildren(this.subPages.favorites.content);
		for (let key in favorites) { this.subPages.favorites.appendChild((new PlaylistDisplay({ data: favorites[key], mode: "ViewAccount" })).content); favoriteIDList.push(favorites[key]._id); }

		PostOffice.setUserFavoritesList(favoriteIDList);
	}

	showSubPage(subPage) {
		if (!this.subPages.hasOwnProperty(subPage) || !this.subPages[subPage]) { console.warn("Attempted to go to a sub-page that does not exist:", subPage); return; }
		for (let key in this.subPages) { if (this.subPages[key]) { this.subPages[key].content.style.display = "none"; } }
		this.subPages[subPage].content.style.display = "block";
	}

	async authUpdate(data) { this.loadMyPlaylists(); this.loadMyFavorites(); }
}