class LandingPage {
	constructor(options) {
		this.options = options;
		this.elements = { playlistListBox: null };
		this.content = this.GenerateContent();
	}
	
	GenerateContent() {
		let container = new Container({ id: "LandingPageContainer", style: { width: "920px", height: "100%", margin: "auto", textAlign: "left", } });

		container.appendChild(this.createPlaylistListBox());

		return container.content;
	}

	createPlaylistListBox() {
		this.elements.playlistListBox = new Container({ id: "PlaylistListBox", style: { width: "100%", } });

		this.loadPlaylistListData();
		PostOffice.addAuthListener(this);

		return this.elements.playlistListBox.content;
	}

	async loadPlaylistListData() {
		let playlistGroup = await PostOffice.PlaylistRandomGroup({});
		if (playlistGroup && playlistGroup.success) {
			playlistGroup = playlistGroup.List;

			clearChildren(this.elements.playlistListBox.content);
			for (let i = 0; i < playlistGroup.length; ++i) { this.elements.playlistListBox.appendChild((new PlaylistDisplay({ data: playlistGroup[i], page: "landing" })).content); }
		}
	}

	async authUpdate(data) { this.loadPlaylistListData(); }
}