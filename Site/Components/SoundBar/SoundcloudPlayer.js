class SoundcloudPlayer {
    constructor(trackLinkList) {
        this.trackLinkList = [];
        this.trackLinkDataMap = {};
        this.player = null;
        this.songIndex = 0;
        this.controlButtons = null;
        this.playButton = null;
        this.progressBar = null;
        this.lastSetVolume = 1.0;
        this.tracksLoadedCallback = null;

        this.initialize(trackLinkList);
    }

    async initialize(trackLinkList) {
        //  Initialize the Soundcloud API, and load the track link list
        this.player = await SC.initialize({ client_id: "dV0jpQ1RaaPeGmiJcmR05K9OPzSaUAZJ", /*redirect_uri: "CALLBACK_URL"*/ });
        if (trackLinkList) { await this.loadTrackLinks(trackLinkList); }
    }

    setCallbacks(callbackMap) {
        callbackMap.play = () => { return this.play(); };
        callbackMap.pause = () => { return this.pause(); };
        callbackMap.seekBackwards = () => { return this.seekBackwards(); };
        callbackMap.seekForward = () => { return this.seekForward(); };
        callbackMap.isPaused = () => { return (this.player.getState() === "paused"); }
    }

    setTracksLoadedCallback(callback) { this.tracksLoadedCallback = callback; }

    seekBackwards() {
        if (!this.player) { console.log("Can't seek backwards... No valid player was found!"); return; }
        if (!(["playing", "paused", "ended"].includes(this.player.getState()))) { return; }

        if ((this.player.currentTime() < 5000) && (this.songIndex !== 0) && (this.player.getState() !== "paused")) {
            if (this.loadSong(this.songIndex - 1)) { --this.songIndex; };
        }
        else {
            let ended = (this.player.getState() === "ended");
            this.player.seek(0);
            if (ended) { this.play(); }
        }
    }

    seekForward() {
        if (!this.player) { console.log("Can't seek forward... No valid player was found!"); return; }
        if (!(["playing", "paused", "ended"].includes(this.player.getState()))) { return; }
        if (this.songIndex < this.trackLinkList.length - 1) { if (this.loadSong(this.songIndex + 1)) { ++this.songIndex; }; }
    }

    play() {
        if (!this.player) { console.log("Can't play...No valid player was found!"); return false; }
        if (this.player.isPlaying()) { console.log("Player is already playing!"); return false; }
        
        this.player.play();
        this.loadTrackInformation();
        this.setPlayingState(true);
        this.setVolume(this.lastSetVolume);
        return true;
    }

    pause() {
        if (!this.player) { console.log("Can't pause...No valid player was found!"); return false; }
        if (!this.player.isPlaying()) { console.log("Player is not playing!"); return false; }
        
        this.player.pause();
        this.setPlayingState(false);
        return true;
    }

    stop() { if (this.player && ["playing", "paused"].includes(this.player.getState())) { this.player.pause(); this.player.seek(0); } }

    getDuration() { if (!this.player) { console.warn("Attempted to get the duration of a song while no player was active"); return 0; } return this.player.getDuration(); }
    
    seek(seekPoint) { if (!this.player) { console.warn("Attempted to seek within a song while no player was active"); return 0; } return this.player.seek(seekPoint); }

    getVolume() { if (!this.player) { console.warn("Attempted to get current volume while no player was active"); return 0; } return this.player.getVolume(); }
    setVolume(volume) { this.lastSetVolume = volume; if (!this.player) { console.warn("Attempted to get current volume while no player was active"); return 0; } return this.player.setVolume(volume); }

    getTrackListData() { return { trackList: this.trackLinkList, trackData: this.trackLinkDataMap }; }

    loadTrackInformation() {
        if ((this.songIndex < 0) || (this.songIndex >= this.trackLinkList.length)) { console.log("Invalid song index:", this.songIndex); return; }
        if (!this.trackLinkDataMap.hasOwnProperty(this.trackLinkList[this.songIndex])) { console.log("Could not find track data:", this.trackLinkList[this.songIndex]); return; }

        let trackData = this.trackLinkDataMap[this.trackLinkList[this.songIndex]];
        if (this.setTrackData) { this.setTrackData(trackData); }
    }

    async loadSong(songIndex, playOverride) {
        if (songIndex < 0) { console.log("Can not load song of an index below zero!"); return false; }
        if (!this.trackLinkList || (this.trackLinkList.length <= songIndex)) { console.log(`Can not load a song at index ${songIndex} with a list of length ${this.trackLinkList.length}`); return false; }

        let wasPlaying = (this.player && ["playing", "paused", "ended"].includes(this.player.getState()));
        this.stop();

        if (this.player) { this.player.kill(); }
        this.player = await SC.stream(`/tracks/${this.trackLinkDataMap[this.trackLinkList[songIndex]].id}`);
        if (!this.player) { console.log("Failed to load player!"); return false; }
        
        this.player.on("time", (progress) => {
            if (!this.player) { return; }
            if (this.player.getState() !== "playing") { return; }
            let duration = this.player.getDuration();
            this.updateProgress(progress, duration);
        });

        this.player.on("state-change", (newState) => {
            console.log("State Change:", newState);
            switch (newState) {
                case "ended": this.seekForward(); break;
            }
        });

        if (wasPlaying || playOverride) { this.play(); }
        return true;
    }

    async addTrackLink(linkURL) {
        await this.getTrackData(linkURL);
        this.trackLinkList.push(linkURL);
        if (this.tracksLoadedCallback) { this.tracksLoadedCallback(this.getTrackListData()); }
    }

    async clearAllTrackData() {
        if (this.player) { 
            this.seek(0);
            this.stop();
        }
        this.songIndex = 0;
        this.trackLinkList = [];
        this.clearAllTrackDataFromUI();
    }

	getFormattedVersionOfURL(url) {
		if (url.substr(0, 10) === "soundcloud") { return "https://" + url; }
		if (url.substr(0, 7) === "http://") { console.log("https://" + url.substr(7, url.length - 7)); return "https://" + url.substr(7, url.length - 7); }
		return url;
	}

    async loadTrackLinks(linkList) {
        if (!linkList || linkList.length === 0) { console.log("Attempted to load an empty track link list."); return; }
        await this.clearAllTrackData();
        await this.addTrackLink(linkList[0]);
        await this.loadSong(0, true);
        for (let i = 1; i < linkList.length; ++i) { await this.addTrackLink(linkList[i]);}
    }

    async getTrackData(trackURL) {
        trackURL = this.getFormattedVersionOfURL(trackURL);
        if (!this.trackLinkDataMap.hasOwnProperty(trackURL)) {
            try { this.trackLinkDataMap[trackURL] = await SC.resolve(trackURL); } catch (error) { delete this.trackLinkDataMap[trackURL]; console.log(error); }
            if (!this.trackLinkDataMap[trackURL]) { console.log("Failed to load track data: ", trackURL); return null; }
        }
        return this.trackLinkDataMap[trackURL];
    }
}