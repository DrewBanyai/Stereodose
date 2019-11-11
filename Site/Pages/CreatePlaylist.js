class CreatePlaylist {
	constructor(options) {
		this.options = options;
		this.playlistPreviewBox = null;
		this.imageVerified = false;
		this.elements = { playlistDisplayPreview: null, playlistTracksBox: null, playlistPreview: null, addTrackButton: null, submitPlaylistButton: null, };
		this.content = this.GenerateContent();
	}

	GenerateContent() {
		let container = new Container({ id: "CreatePlaylistContainer", style: { width: "920px", height: "100%", margin: "auto", textAlign: "left", } });

		let createNewPlaylistLabel = new Label({ id: "CreateNewPlaylistLabel", attributes: { value: "Create New Playlist" }, style: styleConfig.PageTitle, });
		container.appendChild(createNewPlaylistLabel.content);

		container.appendChild(this.createPlaylistDetailsBox());
		container.appendChild(this.createPlaylistPreviewBox());
		container.appendChild(this.createSubmitPlaylistButtonArea());

		return container.content;
	}

	createPlaylistDetailsBox() {
		this.elements.playlistDisplayPreview = new PlaylistDisplay({ data: [], mode: "CreatePlaylist", });
		return this.elements.playlistDisplayPreview.content;
	}

	createPlaylistPreviewBox() {
		this.elements.playlistTracksBox = new Container({ id: "PlaylistTracksBox", style: { width: "918px", margin: "20px 0px 10px 0px", borderRadius: "6px", border: "1px solid rgba(100, 100, 100, 0.6)" }, });

		//  Create the actual box new tracks will go into
		this.elements.playlistPreview = new Container({ id: "PlaylistPreviewBox" });
		this.elements.playlistTracksBox.appendChild(this.elements.playlistPreview.content);
		
		//  Create the button to add more tracks to the list
		this.elements.addTrackButton = new Container({
			id: "AddTrackButton",
			style: { margin: "5px auto 5px auto", width: "30%", height: "32px", borderRadius: "6px", backgroundColor: "rgb(100, 170, 150)", cursor: "pointer", textAlign: "center", },
			events: {
				click: () => {
					let popup = new AddTrackLinkPopup({ submissionCallback: (trackLink, trackData) => { this.addTrackPreviewToPlaylistPreview(trackLink, trackData); } });
					document.body.appendChild(popup.content);
				}
			},
		});
		this.elements.playlistTracksBox.appendChild(this.elements.addTrackButton.content);

		let addTrackSymbol = new Fontawesome({ id: "AddTrackSymbol", attributes: { className: "fas fa-plus-square" }, style: { margin: "7px 7px 7px 7px", color: "rgb(255, 255, 255)", fontSize: "20px", display: "inline-block", }, });
		this.elements.addTrackButton.appendChild(addTrackSymbol.content);

		let addTrackLabel = new Label({ id: "AddTracklabel", attributes: { value: "Add Track", }, style: { fontFamily: "'Staatliches', sans-serif", fontSize: "15px", color: "rgb(255, 255, 255)", display: "inline-block", position: "relative", top: "-2px", }, });
		this.elements.addTrackButton.appendChild(addTrackLabel.content);

		return this.elements.playlistTracksBox.content;
	}

	createSubmitPlaylistButtonArea() {
		let submitPlaylistButtonArea = new Container({ id: "SubmitPlaylistButtonArea" });

		this.elements.submissionErrorLabel = new Label({
			id: "SubmissionErrorLabel",
			attributes: { value: "", },
			style: {
				margin: "0px 0px 0px 0px",
				fontFamily: "Vesper Libre",
				fontSize: "14px",
				color: "rgba(255, 128, 128, 0.8)",
				display: "none",
			},
		});
		submitPlaylistButtonArea.appendChild(this.elements.submissionErrorLabel.content);

		//  Create the button to submit the playlist to the database
		this.elements.submitPlaylistButton = new Container({
			id: "SubmitPlaylistButton",
			style: { margin: "0px auto 0px auto", width: "100%", height: "32px", borderRadius: "6px", backgroundColor: "rgb(100, 120, 165)", cursor: "pointer", textAlign: "center", },
			events: {
				click: async () => {
					let trackPreviews = this.elements.playlistPreview.content.childNodes;
					if (trackPreviews.length < 3) { this.displayError("Can not create a playlist with less than 3 tracks..."); return; }
					let playlistTracks = [];
					for (let i = 0; i < trackPreviews.length; ++i) { playlistTracks.push(trackPreviews[i].getTrackLink()); }

					let playlistName = this.elements.playlistDisplayPreview.playlistData.playlistName;
					if (!playlistName || (playlistName.length < 5)) { this.displayError("Can not create a playlist with a name under 5 characters..."); return; }

					let playlistDesc = this.elements.playlistDisplayPreview.playlistData.playlistDesc;
					if (!playlistDesc || (playlistDesc.length < 5)) { this.displayError("Can not create a playlist with a description under 5 characters..."); return; }

					let playlistImageSrc = this.elements.playlistDisplayPreview.playlistData.imageLink;
					if (!playlistImageSrc) { this.displayError("Can not create a playlist without a thumbnail image source..."); return; }

					let result = await PostOffice.PlaylistCreate(playlistName, playlistDesc, playlistImageSrc, playlistTracks, false, 0, 0);
					if (result) { LoadPage(new ViewPlaylist({ playlistID: result._id })); }
					else {
						let message = (result ? result.message : "Unknown error");
						this.displayError("Error while creating playlist: " + message);
						if (message === "Authorization Failed") {
							//  TODO: Send the user back to the landing page and open the login menu, showing that they need to log back in
						}
					}
				}
			},
		});
		submitPlaylistButtonArea.appendChild(this.elements.submitPlaylistButton.content);

		let addTrackSymbol = new Fontawesome({ id: "SubmitPlaylistSymbol", attributes: { className: "fas fa-check-square" }, style: { margin: "7px 7px 7px 7px", color: "rgb(255, 255, 255)", fontSize: "20px", display: "inline-block", }, });
		this.elements.submitPlaylistButton.appendChild(addTrackSymbol.content);

		let addTrackLabel = new Label({ id: "SubmitPlaylistlabel", attributes: { value: "Submit Playlist", }, style: { fontFamily: "'Staatliches', sans-serif", fontSize: "15px", color: "rgb(255, 255, 255)", display: "inline-block", position: "relative", top: "-2px", }, });
		this.elements.submitPlaylistButton.appendChild(addTrackLabel.content);

		return submitPlaylistButtonArea.content;
	}

	displayError(text) {
		this.elements.submissionErrorLabel.setValue(text);
		setStyle(this.elements.submissionErrorLabel.content, { display: "" });
	};

	swapEntries(a, b) {
		a = a - 1;
		b = b - 1;
		let entries = this.elements.playlistPreview.content.childNodes;
		let entryCount = entries.length;
		if ((a < 0) || (b < 0) || (a >= entryCount) || (b >= entryCount)) { this.displayError("Can't swap an entry with an invalid track number value"); return; }

		let swapElements = (e1, e2) => { e2.nextSibling === e1 ? e1.parentNode.insertBefore(e2, e1.nextSibling) : e1.parentNode.insertBefore(e2, e1); }
		swapElements(entries[a], entries[b]);

		this.updateTrackIndices();
	}

	removeEntry(track) {
		this.elements.playlistPreview.content.removeChild(track.content);

		let trackListFull = (this.elements.playlistPreview.content.childNodes.length === SiteData.GetMaxTrackCountPerPlaylist());
		setStyle(this.elements.addTrackButton.content, { display: trackListFull ? "none" : "", });

		this.updateTrackIndices();
	}

	updateTrackIndices() {
		let entries = this.elements.playlistPreview.content.childNodes;
		for (let i = 0; i < entries.length; ++i) { entries[i].setTrackNumber(i + 1, entries.length); }
	}

	addTrackPreviewToPlaylistPreview(trackLink, trackData) {
		if (!trackData) { this.displayError("Attempted to get track data but could not find anything with the given link"); return; }
		if (!this.elements.playlistPreview) { this.displayError("Failed to find playlist preview list"); console.warn("Could not locate this.elements.playlistPreview"); return; }

		let newCount = this.elements.playlistPreview.content.childNodes.length + 1;
		if (newCount > SiteData.GetMaxTrackCountPerPlaylist()) { this.displayError(`Can not add more than ${SiteData.GetMaxTrackCountPerPlaylist()} tracks to a playlist`); return; }
		let trackPreview = new TrackPreview({
			id: `TrackPreview_${newCount}`,
			trackLink: trackLink,
			trackNumber: newCount,
			fullCount: newCount,
			trackData: trackData,
			swapFunc: (a, b) => { this.swapEntries(a, b); },
			removeFunc: (track) => { this.removeEntry(track); },
		});
		this.elements.playlistPreview.appendChild(trackPreview.content)

		let trackListFull = (this.elements.playlistPreview.content.childNodes.length === SiteData.GetMaxTrackCountPerPlaylist());
		setStyle(this.elements.addTrackButton.content, { display: trackListFull ? "none" : "", });

		this.updateTrackIndices();
	}
}