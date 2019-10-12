class MainPage {
	constructor() {
		this.content = this.GenerateContent();
	}
	
	GenerateContent() {
		let container = new Container({ id: "MainPageContainer", style: { width: "100%", backgroundImage: "linear-gradient(to bottom right, rgb(10, 10, 10), rgb(70, 70, 70))" } });;;

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
		
		for (let i = 0; i < allPlaylists.length; ++i) {
			let playlist = allPlaylists[i];
			let display = new PlaylistDisplay({});
			display.setImage(playlist.imageSource);
			display.setPlaylistName(playlist.name);
			display.setPlaylistDesc(playlist.description);
			display.setTrackList(playlist.trackList);

			listBox.appendChild(display.content);
		}
	}
}