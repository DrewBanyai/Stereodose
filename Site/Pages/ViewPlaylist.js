class ViewPlaylist {
	constructor(options) {
		this.options = options;
		this.elements = { detailsSection: null, trackListSection: null };
		this.content = this.GenerateContent();
	}
	
	GenerateContent() {
		let container = new Container({ id: "ViewPlaylistContainer", style: { width: "920px", height: "100%", margin: "auto", textAlign: "left", } });

		let pageTitleLabel = new Label({ id: "AccountViewLabel", attributes: { value: "Playlist Details" }, style: styleConfig.PageTitle, });
		container.appendChild(pageTitleLabel.content);

		container.appendChild(this.createPlaylistDetailsSection());
		container.appendChild(this.createPlaylistTracksListSection());
		this.fillOutPlaylistData();

		return container.content;
	}

	createPlaylistDetailsSection() {
		this.elements.detailsSection = new Container({ id: "PlaylistDetailsSection", });


		return this.elements.detailsSection.content;
	}

	createPlaylistTracksListSection() {
		this.elements.trackListSection = new Container({ id: "PlaylistTrackListSection", style: { position: "relative", top: "20px", }, });


		return this.elements.trackListSection.content;
	}

	async fillOutPlaylistData() {
		if (this.options.playlistID && !this.options.playlist) { this.options.playlist = await PostOffice.PlaylistDetails(this.options.playlistID); }
		if (!this.options.playlist || !this.options.playlist.success) {
			console.warn("Failed to load playlist", this.options.playlistID);
			setTimeout(() => { LoadMainPage(); }, 10);
			return;
		}
		this.options.playlist = this.options.playlist.playlist;

		this.fillPlaylistDetailsSection();
		this.fillPlaylistTrackListSection();
	}

	async fillPlaylistDetailsSection() {
		let playlistDisplayPreview = new PlaylistDisplay({ data: this.options.playlist, mode: "ViewPlaylist", });
		this.elements.detailsSection.appendChild(playlistDisplayPreview.content);
	}

	async fillPlaylistTrackListSection() {
		for (let i = 0; i < this.options.playlist.trackList.length; ++i) {
			let songBox = new SongDisplayBox({ style: { display: "", width: "331px", height: "34px" } });
			let trackData = await SitewideSoundBar.getTrackData(this.options.playlist.trackList[i]);
			songBox.setTrackData(trackData);
			this.elements.trackListSection.appendChild(songBox.content);
		}
	}
}