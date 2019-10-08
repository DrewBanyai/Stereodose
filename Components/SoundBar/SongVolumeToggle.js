class SongVolumeToggle {
    constructor(options) {
        this.options = options;
        this.muted = false;
        this.savedVolume = 1.0;
        this.volumeSymbol = null;
        this.sliderMenu = null;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "SongVolumeToggle",
            style: {
                position: "relative",
            }
        });
        container.applyOptions(this.options);

        this.volumeSymbol = new Fontawesome({ id: "VolumeToggleSymbol", style: { fontSize: "16px", color: "rgb(120, 120, 120)" }, className: "fas fa-volume-up" });
        container.appendChild(this.volumeSymbol.content);
        
        container.appendChild(this.createSliderMenu());

        container.content.onmouseenter = () => { this.setSliderMenuOpen(true); };
        container.content.onmouseleave = () => { this.setSliderMenuOpen(false); };
        this.volumeSymbol.content.onclick = () => { this.toggleVolumeMute(); }

        return container.content;
    }

    setGetVolumeCallback(callback) { this.getVolumeCallback = callback; }
    setSetVolumeCallback(callback) { this.setVolumeCallback = callback; }

    createSliderMenu() {
        this.sliderMenu = new Container({
            id: "VolumeSliderMenu",
            style: {
                width: "36px",
                height: "130px",
                position: "absolute",
                left: "-12px",
                top: "-100px",
                display: "none",
            }
        });

        let sliderMenuVisible = new Container({
            id: "VolumeSliderMenuVisible",
            style: {
                width: "36px",
                height: "90px",
                backgroundColor: "rgb(80, 80, 80)",
                border: "1px solid rgba(90, 90, 90, 0.2)",
                position: "relative",
            }
        });
        this.sliderMenu.appendChild(sliderMenuVisible.content);

        let sliderBarOuter = new Container({
            id: "VolumeSliderBarOuter",
            style: {
                width: "4px",
                height: "80px",
                margin: "5px auto 5px auto",
                borderRadius: "2px",
                backgroundColor: "rgb(200, 40, 40)",
            },
        });
        sliderMenuVisible.appendChild(sliderBarOuter.content);

        return this.sliderMenu.content;
    }

    setSliderMenuOpen(open) {
        setStyle(this.sliderMenu.content, { display: (open ? "" : "none") });
    }

    getVolumeSymbolClassName(volume) {
        if (this.muted) { return "fas fa-volume-mute"; }
        if (volume <= 0.0) { return "fas fa-volume-off"; }
        if (volume < 0.5) { return "fas fa-volume-down"; }
        else { return "fas fa-volume-up"; }
    }

    toggleVolumeMute() {
        if (!this.muted) {
            this.muted = true;
            this.savedVolume = (this.getVolumeCallback ? this.getVolumeCallback() : 1.0);
            if (this.setVolumeCallback) { this.setVolumeCallback(0); }
        }
        else {
            this.muted = false;
            let volume = ((this.savedVolume !== undefined) && (this.savedVolume !== null)) ? this.savedVolume : 1.0;
            if (this.setVolumeCallback) { this.setVolumeCallback(volume); }
        }

        //  Set the volume symbol
        if (this.volumeSymbol && this.getVolumeCallback) {
            this.volumeSymbol.setSymbol(this.getVolumeSymbolClassName(this.getVolumeCallback()));
        }
    }
}