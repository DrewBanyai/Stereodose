class SoundcloudPlayer {
    constructor(options) {
        this.options = options;
        this.soundcloudLinkList = [];
        this.soundcloudLinkDataMap = {};
        this.player = null;
        this.content = this.generateContent();

		//  Generic options application
		this.content.id = (options && options.id) ? options.id : "SoundcloudPlayer";
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
		if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
    }

    generateContent() {
        SC.initialize({ client_id: "dV0jpQ1RaaPeGmiJcmR05K9OPzSaUAZJ", /*redirect_uri: "CALLBACK_URL"*/ });

        this.getRandomTrackList(); //  TODO: Remove this
        
        let container = document.createElement("div");
        container.style.width = "600px";
        container.style.height = "200px";

        let controlButtons = this.createControlButtons();
        container.appendChild(controlButtons);

        if (this.options && this.options.soundcloudLinkList) { this.soundcloudLinkList = this.options.soundcloudLinkList; this.loadSoundcloudLinks(); }

        return container;
    }

    createControlButtons() {
        let controlButtons = document.createElement("div");

		let playButton = new PrimaryButton({
			id: "PlayButton",
			attributes: { value: "play", },
			style: { fontFamily: "Arial", fontSize: "12px", width: "120px", }
		});
        controlButtons.appendChild(playButton.content);
        playButton.SetOnClick(async () => { if (this.player && !this.player.isPlaying()) { this.player.play(); } });

		let pauseButton = new PrimaryButton({
			id: "PauseButton",
			attributes: { value: "pause", },
			style: { fontFamily: "Arial", fontSize: "12px", width: "120px", marginLeft: "10px", }
		});
        controlButtons.appendChild(pauseButton.content);
        pauseButton.SetOnClick(async () => { if (this.player && this.player.isPlaying()) { this.player.pause(); } });

		let stopButton = new PrimaryButton({
			id: "StopButton",
			attributes: { value: "stop", },
			style: { fontFamily: "Arial", fontSize: "12px", width: "120px", marginLeft: "10px", }
		});
        controlButtons.appendChild(stopButton.content);
        stopButton.SetOnClick(async () => { if (this.player && ["playing", "paused"].includes(this.player.getState())) { this.player.pause(); this.player.seek(0); } });
        
        return controlButtons;
    }

    async getRandomTrackList() {
		let trackList = await SC.get("/tracks");
        console.log("Loaded track list:");
        console.log(trackList);
        //for (var i = 0; i < response.length; i++) {
        //  $("ul").append("<li>" + response[i].title + "</li>");
        //}
    }

    async loadSoundcloudLinks() {
        if (this.soundcloudLinkList.length === 0) { console.log("Attempted to load an empty soundcloud link list."); return; }

        for (let i = 0; i < this.soundcloudLinkList.length; ++i) {
            let link = this.soundcloudLinkList[i];
			this.soundcloudLinkDataMap[link] = await SC.resolve(link);
            if (!this.soundcloudLinkDataMap[link]) { console.log("Failed to load soundcloud link!", link); return; }
        }

        this.player = await SC.stream(`/tracks/${this.soundcloudLinkDataMap[this.soundcloudLinkList[0]].id}`);
        if (!this.player) { console.log("Failed to load player!"); return; }
    }
}