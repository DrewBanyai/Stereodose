class CreatePlaylist {
	constructor() {
		this.content = this.GenerateContent();
	}
	
	GenerateContent() {
		let container = new Container({ id: "CreatePlaylistContainer", style: { width: "920px", height: "100%", margin: "auto", } });;;

		let createNewPlaylistLabel = new Label({ id: "CreateNewPlaylistLabel", attributes: { value: "Create New Playlist" }, style: addStyle(styleTemplate.PageTitle, { padding: "2px 0px 0px 0px", }), });
		container.appendChild(createNewPlaylistLabel.content);

		let playlistTrackSubmissionBox = new Container({
			id: "PlaylistTrackSubmissionBox",
			style: { width: "100%" },
		});
		container.appendChild(playlistTrackSubmissionBox.content);

		let playlistTrackLinkInput = new TextInput({
			id: "PlaylistTrackLinkInput",
			style: { width: "400px", height: "20px", color: "rgb(64, 64, 64)" },
		});
		playlistTrackSubmissionBox.appendChild(playlistTrackLinkInput.content);

		let playlistSubmitTrackLinkButton = new PrimaryButton({
			id: "PlaylistSubmitTrackLinkButton",
			attributes: { value: "Submit" },
			style: { with: "120px", height: "20px", },
			events: { click: async () => {
				let trackLink = playlistTrackLinkInput.getValue();
				let trackData = await SC.resolve(trackLink);
				console.log(trackData);
			}, },
		});
		playlistTrackSubmissionBox.appendChild(playlistSubmitTrackLinkButton.content);

		return container.content;
	}


}