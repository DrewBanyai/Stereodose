class LandingPage {
	constructor(options) {
		this.options = options;
		this.content = this.GenerateContent();
	}
	
	GenerateContent() {
		let container = new Container({ id: "LandingPageContainer", style: { width: "920px", height: "100%", margin: "auto", textAlign: "left", } });

		container.appendChild(this.createPlaylistListBox());

		return container.content;
	}

	createPlaylistListBox() {
		let playlistListBox = new Container({ id: "PlaylistListBox", style: { width: "700px", } });

		this.loadPlaylistListData(playlistListBox);

		return playlistListBox.content;
	}

	async loadPlaylistListData(listBox) {
		let allPlaylists = await PostOffice.GetAllPlaylists("4b6f735f938e6fc4571e994999623f61");
		if (allPlaylists && allPlaylists.success) { allPlaylists = allPlaylists.List; }
		
		for (let i = 0; i < allPlaylists.length; ++i) { listBox.appendChild((new PlaylistDisplay({ data: allPlaylists[i] })).content); }
	}
}