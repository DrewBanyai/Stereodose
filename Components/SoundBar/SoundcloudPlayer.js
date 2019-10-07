class SoundcloudPlayer {
    constructor(options) {
        this.options = options;
        this.soundcloudLinkList = [];
        this.soundcloudLinkDataMap = {};
        this.player = null;
        this.songIndex = 0;
        this.controlButtons = null;
        this.playButton = null;
        this.progressBar = null;
        this.progressTickEvent = null;
        this.content = this.generateContent();

		//  Generic options application
		this.content.id = (options && options.id) ? options.id : "SoundcloudPlayer";
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
		if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
    }

    generateContent() {
        SC.initialize({ client_id: "dV0jpQ1RaaPeGmiJcmR05K9OPzSaUAZJ", /*redirect_uri: "CALLBACK_URL"*/ });
        
        let container = document.createElement("div");
        container.style.width = "100%";
        container.style.height = "200px";
        container.style.backgroundColor = "black";

        container.appendChild(this.createControlButtons());
        container.appendChild(this.createProgressBar());

        if (this.options && this.options.soundcloudLinkList) { this.loadSoundcloudLinks(this.options.soundcloudLinkList); }

        return container;
    }

    createControlButtons() {
        this.controlButtons = document.createElement("div");
        this.controlButtons.id = "ControlButtons";
        this.controlButtons.style.display = "inline-block";

        let createControlButton = (id, w, h, fontAwesome, style, callback) => {
            let button = document.createElement("div");
            button.id = id;
            setStyle(button, { borderRadius: "6px", backgroundColor: "rgb(200, 200, 200)", color: "black", width: w, height: h, cursor: "pointer", textAlign: "center", display: "inline-block", });
            setStyle(button, style);
            button.onclick = () => callback(button, symbol);
    
            let symbol = document.createElement("i");
            symbol.className = fontAwesome;
            setStyle(symbol, { color: "black", lineHeight: h, userSelect: "none", });
            symbol.changeSymbol = (fontAwesome) => { symbol.className = fontAwesome; };
            button.appendChild(symbol);
            button.symbol = symbol;
    
            return button;
        }

        let backwardButton = createControlButton("SeekBackwardButton", "34px", "34px", "fas fa-backward", { margin: "0px 2px 0px 0px" }, async () => {
            if (this.seekBackwardCallback()) { console.log("SEEK SUCCESSFUL"); }
        });
        this.controlButtons.appendChild(backwardButton)

        this.playButton = createControlButton("PlayPauseButton", "40px", "40px", "fas fa-play", { margin: "0px 2px 0px 0px" }, async (button, symbol) => {
            if (this.playCallback()) { }
            else if (this.pauseCallback()) { }
        });
        this.controlButtons.appendChild(this.playButton);

        let forwardButton = createControlButton("SeekForwardButton", "34px", "34px", "fas fa-forward", {}, async () => {
            if (this.seekForwardCallback()) { console.log("SEEK SUCCESSFUL"); }
        });
        this.controlButtons.appendChild(forwardButton);

        this.controlButtons.setDisabled = (disabled) => {
            backwardButton.disabled = disabled;
            this.playButton.disabled = disabled;
            forwardButton.disabled = disabled;
        }

        this.controlButtons.setDisabled(true);
        return this.controlButtons;
    }

    createProgressBar() {
        this.progressBar = new SongProgressBar({ progressCallback: (newProgress) => {
            if (!this.player) { return; }
            let duration = this.player.getDuration();
            let newTime = (duration * newProgress / 100).toFixed(3);
            this.player.seek(newTime);
        }});
        return this.progressBar.content;
    }

    seekBackwardCallback() {
        console.log("State:", this.player.getState());
        console.log("Song Index:", this.songIndex);
        console.log("Current Time:", this.player.currentTime());

        if (!this.player) { console.log("No valid player was found!"); return; }
        if (!(["playing", "paused", "ended"].includes(this.player.getState()))) { return; }

        if ((this.player.currentTime() < 5000) && (this.songIndex !== 0) && (this.player.getState() !== "paused")) {
            if (this.loadSong(this.songIndex - 1)) { --this.songIndex; };
        }
        else {
            let ended = (this.player.getState() === "ended");
            this.player.seek(0);
            if (ended) { this.playCallback(); }
        }
    }

    seekForwardCallback() {
        if (!this.player) { console.log("No valid player was found!"); return; }
        if (!(["playing", "paused", "ended"].includes(this.player.getState()))) { return; }
        if (this.songIndex < this.soundcloudLinkList.length - 1) { if (this.loadSong(this.songIndex + 1)) { ++this.songIndex; }; }
    }

    playCallback() {
        if (!this.player) { console.log("No valid player was found!"); return; }
        if (!this.player.isPlaying()) { this.player.play(); this.loadTrackInformation(); this.setPlayingSymbol(false); return true; }
        return false;
    }

    setPlayingSymbol(play) {
        this.playButton.symbol.changeSymbol(play ? "fas fa-play" : "fas fa-pause");
    }

    pauseCallback() { if (this.player && this.player.isPlaying()) { this.player.pause(); this.setPlayingSymbol(true); return true; } return false; }

    stopCallback() { if (this.player && ["playing", "paused"].includes(this.player.getState())) { this.player.pause(); this.player.seek(0); } }

    loadTrackInformation() {
        if ((this.songIndex < 0) || (this.songIndex >= this.soundcloudLinkList.length)) { console.log("Invalid song index:", this.songIndex); return; }
        if (!this.soundcloudLinkDataMap.hasOwnProperty(this.soundcloudLinkList[this.songIndex])) { console.log("Could not find track data:", this.soundcloudLinkList[this.songIndex]); return; }
        let trackData = this.soundcloudLinkDataMap[this.soundcloudLinkList[this.songIndex]];
        console.log(trackData);
        console.log(trackData.artwork_url);
        console.log(trackData.genre);
        console.log(trackData.permalink_url);
        console.log(trackData.tag_list);
        console.log(trackData.title);
    }

    updateProgress(currentTime) {
        if (!this.player) { return; }
        if (!this.progressBar) { return; }
        if (this.player.getState() !== "playing") { return; }

        let duration = this.player.getDuration();
        if (!duration) { return; }
        this.progressBar.setProgress(((currentTime / duration) * 100).toFixed(3));
    }

    async loadSong(songIndex) {
        if (songIndex < 0) { console.log("Can not load song of an index below zero!"); return false; }
        if (!this.soundcloudLinkList || (this.soundcloudLinkList.length <= songIndex)) { console.log(`Can not load a song at index ${songIndex} with a list of length ${this.soundcloudLinkList.length}`); return false; }

        let wasPlaying = (this.player && ["playing", "paused", "ended"].includes(this.player.getState()));
        this.stopCallback();

        if (this.player) { this.player.kill(); }
        this.controlButtons.setDisabled(true);
        this.player = await SC.stream(`/tracks/${this.soundcloudLinkDataMap[this.soundcloudLinkList[songIndex]].id}`);
        if (!this.player) { console.log("Failed to load player!"); return false; }
        this.controlButtons.setDisabled(false);
        
        this.player.on("time", (currentTime) => { this.updateProgress(currentTime); });

        this.player.on("state-change", (newState) => {
            console.log("State Change:", newState);
            switch (newState) {
                case "ended": this.seekForwardCallback(); break;
            }
        });

        if (wasPlaying) { this.playCallback(); }
        return true;
    }

    async addSoundcloudLink(linkURL) {
        this.soundcloudLinkDataMap[linkURL] = await SC.resolve(linkURL);
        if (!this.soundcloudLinkDataMap[linkURL]) { console.log("Failed to load soundcloud link!", linkURL); return; }
        this.soundcloudLinkList.push(linkURL);
    }

    async loadSoundcloudLinks(linkList) {
        if (!linkList || linkList.length === 0) { console.log("Attempted to load an empty soundcloud link list."); return; }
        for (let i = 0; i < linkList.length; ++i) { await this.addSoundcloudLink(linkList[i]); }

        await this.loadSong(this.songIndex);
    }
}