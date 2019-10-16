class CreatePlaylist {
	constructor(options) {
		this.options = options;
		this.playlistPreviewBox = null;
		this.content = this.GenerateContent();
	}
	
	GenerateContent() {
		let container = new Container({ id: "CreatePlaylistContainer", style: { width: "920px", height: "100%", margin: "auto", textAlign: "left", } });;;

		let createNewPlaylistLabel = new Label({ id: "CreateNewPlaylistLabel", attributes: { value: "Create New Playlist" }, style: addStyle(styleTemplate.PageTitle, { padding: "2px 0px 0px 0px", }), });
		container.appendChild(createNewPlaylistLabel.content);

		container.appendChild(this.createPlaylistTrackSubmissionBox());
		container.appendChild(this.createPlaylistPreviewBox());
		container.appendChild(this.createSubmitPlaylistButton());

		return container.content;
	}

	createPlaylistTrackSubmissionBox() {
		let playlistTrackSubmissionBox = new Container({ id: "PlaylistTrackSubmissionBox", style: { width: "100%", margin: "16px 0px 0px 0px", }, });

		let playlistTrackLinkInput = new TextInput({ id: "PlaylistTrackLinkInput", style: { width: "400px", height: "20px", color: "rgb(64, 64, 64)", display: "inline-flex", }, });
		playlistTrackSubmissionBox.appendChild(playlistTrackLinkInput.content);

		let playlistSubmitTrackLinkButton = new PrimaryButton({
			id: "PlaylistSubmitTrackLinkButton",
			attributes: { value: "Submit" },
			style: { with: "80px", height: "26px", margin: "0px 0px 0px 10px", display: "inline-flex", fontSize: "14px", fontWeight: "bold", },
			events: {
				click: async () => {
					let trackLink = playlistTrackLinkInput.getValue();
					let trackData = await SC.resolve(this.getFormattedVersionOfURL(trackLink));
					this.addTrackPreviewToPlaylistPreview(trackLink, trackData);
					playlistTrackLinkInput.setValue("");
				}
			},
		});
		playlistTrackSubmissionBox.appendChild(playlistSubmitTrackLinkButton.content);

		return playlistTrackSubmissionBox.content;
	}

	createPlaylistPreviewBox() {
		this.playlistPreviewBox = new Container({ id: "PlaylistPreviewBox", style: { width: "100%", margin: "20px 0px 0px 0px", padding: "3px 6px 3px 6px", borderRadius: "6px", border: "1px solid rgba(100, 100, 100, 0.6)" }, });

		return this.playlistPreviewBox.content;
	}

	createSubmitPlaylistButton() {
		this.submitPlaylistButton = new PrimaryButton({
			id: "SubmitPlaylistButton",
			attributes: { value: "Submit Playlist", },
			style: {
				width: "120px",
				height: "26px",
				fontSize: "14px",
				fontWeight: "bold",
				margin: "10px 0px 0px 0px",
			},
			events: {
				click: async () => {
					let trackPreviews = this.playlistPreviewBox.content.childNodes;
					let playlistTracks = [];
					for (let i = 0; i < trackPreviews.length; ++i) { playlistTracks.push(trackPreviews[i].getTrackLink()); }


					let result = await PostOffice.PlaylistCreate("Test Playlist", "This is a test", "https://i.imgur.com/R1RvzJH.jpg", playlistTracks);
					if (!result || !result.success) {
						console.warn("Failed to create playlist: " + result.message);
						if (result.message === "Authorization Failed") {
							
						}
					}
					//  TODO: Go to the new playlist's page once we have that...
				}
			}
		});

		return this.submitPlaylistButton.content;
	}

	getFormattedVersionOfURL(url) {
		if (url.substr(0, 10) === "soundcloud") { return "https://" + url; }
		if (url.substr(0, 7) === "http://") { console.log("https://" + url.substr(7, url.length - 7)); return "https://" + url.substr(7, url.length - 7); }
		return url;
	}

	swapEntries(a, b) {
		a = a - 1;
		b = b - 1;
		let entries = this.playlistPreviewBox.content.childNodes;
		let entryCount = entries.length;
		if ((a < 0) || (b < 0) || (a >= entryCount) || (b >= entryCount)) { console.log("Can't swap an entry with an invalid track number value"); return; }

		let swapElements = (e1, e2) => { e2.nextSibling === e1 ? e1.parentNode.insertBefore(e2, e1.nextSibling) : e1.parentNode.insertBefore(e2, e1); }
		swapElements(entries[a], entries[b]);

		for (let i = 0; i < entryCount; ++i) { entries[i].setTrackNumber(i + 1, entryCount); }
	}

	addTrackPreviewToPlaylistPreview(trackLink, trackData) {
		if (!trackData) { console.warn("Attempted to get track data but could not find anything with the given link"); return; }
		if (!this.playlistPreviewBox) { console.warn("Could not locate PlaylistPreviewBox"); return; }

		let newCount = this.playlistPreviewBox.content.childNodes.length + 1;
		if (newCount > 12) { console.warn("Can not add more than 12 tracks to a playlist"); return; }
		let trackPreview = new TrackPreview({ id: `TrackPreview_${newCount}`, trackLink: trackLink, trackNumber: newCount, fullCount: newCount, trackData: trackData, swapFunc: (a, b) => { this.swapEntries(a, b); } });
		this.playlistPreviewBox.appendChild(trackPreview.content)

		for (let i = 0; i < newCount; ++i) { this.playlistPreviewBox.content.childNodes[i].setTrackNumber(i + 1, newCount); }
	}
}