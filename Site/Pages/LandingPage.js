class LandingPage {
	constructor(options) {
		this.options = options;
		this.elements = { playlistListFilterBox: null, playlistListArea: null, resultsCountLabel: null, playlistListBox: null };
		this.content = this.GenerateContent();
		this.loadPlaylistListData();
	}
	
	GenerateContent() {
		let container = new Container({ id: "LandingPageContainer", style: { width: "920px", height: "100%", margin: "auto", textAlign: "center", } });

		container.appendChild(this.createPlaylistFilterBox());
		container.appendChild(this.createPlaylistListBox());

		return container.content;
	}

	createPlaylistFilterBox() {
		this.elements.playlistListFilterBox = new PlaylistFilterBox({ mode: "Search", filterChoiceCallback: (filterData) => { this.loadPlaylistListData(filterData) }, });
		return this.elements.playlistListFilterBox.content;
	}

	createPlaylistListBox() {
		this.elements.playlistListArea = new Container({ id: "PlaylistListArea", style: { textAlign: "left", } });

		this.elements.resultsCountLabel = new Label({
			id: "ResultsCountLabel",
			attributes: { value: "" },
			style: {
				margin: "12px 0px 2px 0px",
                fontFamily: "Big Shoulders Text",
                fontSize: "18px",
                color: "rgb(128, 128, 128)",
			}
		});
		this.elements.playlistListArea.appendChild(this.elements.resultsCountLabel.content);

		this.elements.playlistListBox = new Container({ id: "PlaylistListBox", style: { width: "100%", } });
		this.elements.playlistListArea.appendChild(this.elements.playlistListBox.content);

		PostOffice.addAuthListener(this);

		return this.elements.playlistListArea.content;
	}

	async loadPlaylistListData(filterData) {
		let playlistGroup = await PostOffice.PlaylistRandomGroup(filterData);
		if (playlistGroup && playlistGroup.success) {
			playlistGroup = playlistGroup.List;

			this.elements.resultsCountLabel.setValue(`Showing ${playlistGroup.length} playlist results...`)

			clearChildren(this.elements.playlistListBox.content);
			for (let i = 0; i < playlistGroup.length; ++i) { this.elements.playlistListBox.appendChild((new PlaylistDisplay({ data: playlistGroup[i], mode: "PlaylistSearch", })).content); }
		}
	}

	async authUpdate(data) { this.loadPlaylistListData(); }
}