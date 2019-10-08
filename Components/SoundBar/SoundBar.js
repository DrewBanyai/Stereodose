class SoundBar {
    constructor(options) {
        this.options = options;
        this.buttons = { seekBackwards: null, playPause: null, seekForward: null };
        this.callbacks = { play: null, pause: null, seekBackwards: null, seekForward: null };
        this.soundcloudPlayer = null;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "SoundBar",
            style: { width: "100%", height: "40px", margin: "0px", backgroundColor: "rgb(20, 20, 20)", position: "fixed", bottom: "0px", }
        });

        let centeredContainer = new Container({ id: "SoundControlButtons", style: { width: "920px", margin: "auto", } });
        centeredContainer.appendChild(this.createSeekAndPlayButtons());
        centeredContainer.appendChild(this.createProgressBar());
        centeredContainer.appendChild(this.createVolumeToggle());
        container.appendChild(centeredContainer.content);

        //  Save off the Soundcloud Player instance, which is used to play and control songs
        this.player = new SoundcloudPlayer(this.options.trackList);
        this.player.setCallbacks(this.callbacks);
        this.player.setPlayingState = (playing) => { this.setPlayingState(playing); }
        this.player.updateProgress = (progress, duration) => { this.updateProgress(progress, duration); };

        return container.content;
    }

    createControlButton(id, w, h, fontAwesome, style, callback) {
        let button = new Container({ id: id, style: { borderRadius: "6px", color: "rgb(200, 200, 200)", width: w, height: h, cursor: "pointer", textAlign: "center", display: "inline-block", } });
        setStyle(button.content, style);
        button.content.onclick = () => callback();

        let symbolColors = { mouseOver: "rgb(160, 160, 160", mouseOut: "rgb(120, 120, 120)" };
        let symbol = new Fontawesome({ id: id + "_Symbol", style: { color: symbolColors.mouseOut, fontSize: "16px", lineHeight: h, userSelect: "none", }, className: fontAwesome });
        symbol.content.onmouseover = () => { setStyle(symbol.content, { color: symbolColors.mouseOver, }); };
        symbol.content.onmouseout = () => { setStyle(symbol.content, { color: symbolColors.mouseOut, }); };
        button.appendChild(symbol.content);

        button.content.changeSymbol = (fontAwesome) => { symbol.content.className = fontAwesome; };
        button.symbol = symbol.content;

        return button.content;
    }

    async pressSeekBackwards() { if (this.callbacks.seekBackwards) { this.callbacks.seekBackwards(); } }
    async pressPlayPause() { if (this.callbacks.play && this.callbacks.play()) {} else if (this.callbacks.pause && this.callbacks.pause()) {} }
    async pressSeekForward() { if (this.callbacks.seekForward) { this.callbacks.seekForward(); } }

    setPlayingState(playing) { this.buttons.playPause.changeSymbol(playing ? "fas fa-play" : "fas fa-pause"); }

    createSeekAndPlayButtons(soundBar) {
        let controlButtons = new Container({ id: "ControlButtons", style: { display: "inline-block" }});

        this.buttons.seekBackwards = this.createControlButton("SeekBackwardButton", "34px", "34px", "fas fa-backward", { margin: "0px 2px 0px 0px" }, () => { this.pressSeekBackwards(); });
        controlButtons.appendChild(this.buttons.seekBackwards)

        this.buttons.playPause = this.createControlButton("PlayPauseButton", "40px", "40px", "fas fa-play", { margin: "0px 2px 0px 0px" }, () => { this.pressPlayPause(); });
        controlButtons.appendChild(this.buttons.playPause);

        this.buttons.seekForward = this.createControlButton("SeekForwardButton", "34px", "34px", "fas fa-forward", {}, () => { this.pressSeekForward(); });
        controlButtons.appendChild(this.buttons.seekForward);

        return controlButtons.content;
    }

    createProgressBar() {
        let progressBarContainer = new Container({ id: "ProgressBarContainer", style: { width: "700px", display: "inline-block", padding: "0px 0px 0px 10px", textAlign: "center" } });

        this.progressTimerLabel = new Label("ProgressTimerLabel", "0:00", "'Titillium Web', sans-serif", "12px", "div", "none");
        setStyle(this.progressTimerLabel.content, { color: "rgb(200, 90, 90)", display: "inline-block", margin: "0px 10px 0px 0px", position: "relative", top: "-2px", });
        progressBarContainer.appendChild(this.progressTimerLabel.content);

        this.progressBar = new SongProgressBar({
            style: { display: "inline-block", position: "relative", top: "-2px" },
            progressCallback: (newProgress) => {
                if (!this.player) { return; }
                let duration = this.player.getDuration();
                let newTime = (duration * newProgress / 100).toFixed(3);
                this.player.seek(newTime);
            }
        });
        progressBarContainer.appendChild(this.progressBar.content);

        return progressBarContainer.content;
    }
    
    updateProgress(progress, duration) {
        if (!this.progressBar) { return; }
        if (!duration) { return; }
        if (this.progressTimerLabel) this.progressTimerLabel.SetText(Convert.SecondsToMinutesAndSeconds(progress));
        this.progressBar.setProgress(((progress / duration) * 100).toFixed(3));
    }

    createVolumeToggle() {
        let volumeToggle = new SongVolumeToggle({ id: "SongVolumeToggle", style: { display: "inline-block" } });
        volumeToggle.setGetVolumeCallback(() => { return this.player.getVolume(); });
        volumeToggle.setSetVolumeCallback((volume) => { return this.player.setVolume(volume); });
        return volumeToggle.content;
    }
}