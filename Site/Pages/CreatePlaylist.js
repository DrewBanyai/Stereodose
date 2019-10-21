class CreatePlaylist {
	constructor(options) {
		this.options = options;
		this.playlistPreviewBox = null;
		this.imageVerified = false;
		this.elements = { playlistPreview: null, playlistNameText: null, playlistDescText: null, playlistImageVerifier: null, playlistImageText: null, playlistImagePreview: null };
		this.content = this.GenerateContent();
	}

	GenerateContent() {
		let container = new Container({ id: "CreatePlaylistContainer", style: { width: "920px", height: "100%", margin: "auto", textAlign: "left", } });

		let createNewPlaylistLabel = new Label({ id: "CreateNewPlaylistLabel", attributes: { value: "Create New Playlist" }, style: styleTemplate.PageTitle, });
		container.appendChild(createNewPlaylistLabel.content);

		container.appendChild(this.createPlaylistDetailsBox())
		container.appendChild(this.createPlaylistTrackSubmissionBox());
		container.appendChild(this.createPlaylistPreviewBox());
		container.appendChild(this.createSubmitPlaylistButton());

		return container.content;
	}

	createPlaylistDetailsBox() {
		let playlistDetailsBox = new Container({ id: "PlaylistDetailsBox", style: { width: "100%", margin: "16px 0px 0px 0px" }, });

		//  Create the label and text input for defining the playlist name
		let playlistNameBox = new Container({ id: "PlaylistNameBox", style: { position: "relative", } });
		playlistDetailsBox.appendChild(playlistNameBox.content);

		let playlistNameLabel = new Label({ id: "PlaylistNameLabel", attributes: { value: "Playlist Name:" }, style: { fontFamily: "'Titillium Web', sans-serif", fontSize: "14px", color: "rgb(160, 160, 160)", margin: "0px 5px 0px 0px", display: "inline-block", }, });
		playlistNameBox.appendChild(playlistNameLabel.content);

		this.elements.playlistNameText = new TextInput({ id: "PlaylistNameTextInput", attributes: { value: "" }, style: { width: "320px", fontFamily: "'Titillium Web', sans-serif", fontSize: "12px", color: "rgb(64, 64, 64)", display: "inline-block", position: "absolute", top: "-1px", left: "160px", }, });
		playlistNameBox.appendChild(this.elements.playlistNameText.content);

		//  Create the label and text input for defining the playlist name
		let playlistDescBox = new Container({ id: "PlaylistDescBox", style: { margin: "5px 0px 0px 0px", position: "relative", } });
		playlistDetailsBox.appendChild(playlistDescBox.content);

		let playlistDescLabel = new Label({ id: "PlaylistDescLabel", attributes: { value: "Playlist Description:" }, style: { fontFamily: "'Titillium Web', sans-serif", fontSize: "14px", color: "rgb(160, 160, 160)", margin: "0px 5px 0px 0px", display: "inline-block", }, });
		playlistDescBox.appendChild(playlistDescLabel.content);

		this.elements.playlistDescText = new TextInput({ id: "PlaylistDescTextInput", attributes: { value: "" }, style: { width: "600px", fontFamily: "'Titillium Web', sans-serif", fontSize: "12px", color: "rgb(64, 64, 64)", display: "inline-block", position: "absolute", top: "-1px", left: "160px", }, });
		playlistDescBox.appendChild(this.elements.playlistDescText.content);

		//  Create the label, text input, and image preview block for the playlist preview image
		let playlistImageBox = new Container({ id: "PlaylistImageBox", style: { margin: "5px 0px 0px 0px", position: "relative", } });
		playlistDetailsBox.appendChild(playlistImageBox.content);

		let playlistImageLabel = new Label({ id: "PlaylistImageLabel", attributes: { value: "Playlist Image (URL):" }, style: { fontFamily: "'Titillium Web', sans-serif", fontSize: "14px", color: "rgb(160, 160, 160)", margin: "0px 5px 0px 0px", display: "inline-block", }, });
		playlistImageBox.appendChild(playlistImageLabel.content);

		this.elements.playlistImageVerifier = new Fontawesome({ id: "PlaylistImageVerifier", style: { color: "rgb(60, 200, 60)", fontSize: "16px", position: "relative", left: "5px", top: "2px", display: "none" } });
		let setVerified = (verified) => {
			if (verified === null) { setStyle(this.elements.playlistImageVerifier.content, { display: "none" }); }
			else {
				setStyle(this.elements.playlistImageVerifier.content, { display: "", color: verified ? "rgb(60, 160, 60)" : "rgb(160, 60, 60)" });
				setAttributes(this.elements.playlistImageVerifier.content, { class: verified ? "fas fa-check-square" : "fas fa-times-circle" });
			}
			this.imageVerified = verified;
		}
		playlistImageBox.appendChild(this.elements.playlistImageVerifier.content);

		this.elements.playlistImageText = new TextInput({
			id: "PlaylistImageTextInput",
			attributes: { value: "" },
			style: { width: "400px", fontFamily: "'Titillium Web', sans-serif", fontSize: "12px", color: "rgb(64, 64, 64)", display: "inline-block", position: "absolute", top: "-1px", left: "160px", },
			events: {
				keyup: async () => {
					if (!this.elements.playlistImageText.getValue() || this.elements.playlistImageText.getValue().length === 0) {
						this.elements.playlistImagePreview.content.style.backgroundImage = "";
						setVerified(null);
						return;
					}
					try {
						if (await loadImageToBase64(this.elements.playlistImageText.getValue())) {
							this.elements.playlistImagePreview.content.style.backgroundImage = "url(" + this.elements.playlistImageText.getValue() + ")";
							setVerified(true);
						}
						else { setVerified(false); this.elements.playlistImagePreview.content.style.backgroundImage = ""; }
					}
					catch (error) { setVerified(false); this.elements.playlistImagePreview.content.style.backgroundImage = ""; }
				},
			}
		});
		playlistImageBox.appendChild(this.elements.playlistImageText.content);

		this.elements.playlistImagePreview = new Container({ id: "PlaylistImagePreview", style: { width: "18px", height: "18px", border: "1px solid rgb(200, 200, 200)", position: "absolute", top: "-1px", left: "566px", backgroundRepeat: "round" }, });
		playlistImageBox.appendChild(this.elements.playlistImagePreview.content);

		return playlistDetailsBox.content;
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
		this.elements.playlistPreview = new Container({ id: "PlaylistPreviewBox", style: { width: "100%", margin: "20px 0px 0px 0px", padding: "3px 6px 3px 6px", borderRadius: "6px", border: "1px solid rgba(100, 100, 100, 0.6)" }, });

		return this.elements.playlistPreview.content;
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
					let trackPreviews = this.elements.playlistPreview.content.childNodes;
					if (trackPreviews.length < 3) { console.warn("Can not create a playlist with less than 3 tracks."); return; }
					let playlistTracks = [];
					for (let i = 0; i < trackPreviews.length; ++i) { playlistTracks.push(trackPreviews[i].getTrackLink()); }

					let playlistName = this.elements.playlistNameText ? this.elements.playlistNameText.getValue() : null;
					if (!playlistName || (playlistName.length < 5)) { console.warn("Can not create a playlist with a name under 5 characters"); return; }

					let playlistDesc = this.elements.playlistDescText ? this.elements.playlistDescText.getValue() : null;
					if (!playlistDesc || (playlistDesc.length < 5)) { console.warn("Can not create a playlist with a description under 5 characters"); return; }

					if (!this.imageVerified) { console.warn("Can not create a playlist without a preview image"); return; }
					let playlistImageSrc = this.elements.playlistImageText ? this.elements.playlistImageText.getValue() : null;

					let result = await PostOffice.PlaylistCreate(playlistName, playlistDesc, playlistImageSrc, playlistTracks, false);
					if (result && result.success) { LoadPage(new ViewPlaylist({})); }
					else {
						let message = (result ? result.message : "Unknown error");
						console.warn("Failed to create playlist: " + message);
						if (message === "Authorization Failed") {
							//  TODO: Send the user back to the landing page and open the login menu, showing that they need to log back in
						}
					}
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
		let entries = this.elements.playlistPreview.content.childNodes;
		let entryCount = entries.length;
		if ((a < 0) || (b < 0) || (a >= entryCount) || (b >= entryCount)) { console.log("Can't swap an entry with an invalid track number value"); return; }

		let swapElements = (e1, e2) => { e2.nextSibling === e1 ? e1.parentNode.insertBefore(e2, e1.nextSibling) : e1.parentNode.insertBefore(e2, e1); }
		swapElements(entries[a], entries[b]);

		for (let i = 0; i < entryCount; ++i) { entries[i].setTrackNumber(i + 1, entryCount); }
	}

	addTrackPreviewToPlaylistPreview(trackLink, trackData) {
		if (!trackData) { console.warn("Attempted to get track data but could not find anything with the given link"); return; }
		if (!this.elements.playlistPreview) { console.warn("Could not locate elements.playlistPreview"); return; }

		let newCount = this.elements.playlistPreview.content.childNodes.length + 1;
		if (newCount > 12) { console.warn("Can not add more than 12 tracks to a playlist"); return; }
		let trackPreview = new TrackPreview({ id: `TrackPreview_${newCount}`, trackLink: trackLink, trackNumber: newCount, fullCount: newCount, trackData: trackData, swapFunc: (a, b) => { this.swapEntries(a, b); } });
		this.elements.playlistPreview.appendChild(trackPreview.content)

		for (let i = 0; i < newCount; ++i) { this.elements.playlistPreview.content.childNodes[i].setTrackNumber(i + 1, newCount); }
	}
}