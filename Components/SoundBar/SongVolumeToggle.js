class SongVolumeToggle {
    constructor(options) {
        this.options = options;
        this.muted = false;
        this.savedVolume = 1.0;
        this.volumeSymbol = null;
        this.sliderMenu = null;
        this.sliderMenuHeight = 90;
        this.bufferSpaceY = 20;
        this.verticalOffset = 10;
        this.sliderMenuOffsetY = -(this.sliderMenuHeight + this.bufferSpaceY + this.verticalOffset);
        this.moverSize = 9;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "SongVolumeToggle",
            style: {
                position: "relative",
                left: "0px",
                top: "-10px",
                width: "40px",
                height: "40px",
            }
        });
        container.applyOptions(this.options);

        this.volumeSymbol = new Fontawesome({ id: "VolumeToggleSymbol", attributes: { className: "fas fa-volume-up" }, style: { fontSize: "16px", color: "rgb(120, 120, 120)", position: "relative", left: "12px", top: "10px", }, });
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
                left: "2px",
                top: `${this.sliderMenuOffsetY}px`,
                display: "none",
            }
        });

        let sliderMenuVisible = new Container({
            id: "VolumeSliderMenuVisible",
            style: {
                width: "36px",
                height: `${this.sliderMenuHeight + this.bufferSpaceY}px`,
                backgroundColor: "rgb(80, 80, 80)",
                border: "1px solid rgba(90, 90, 90, 0.2)",
                position: "relative",
            },
            events: {
                click: (e) => {
                    if (e.layerY < (this.bufferSpaceY / 2) || e.layerY > (this.sliderMenuHeight + (this.bufferSpaceY / 2))) { return; }
                    if (this.muted) { this.toggleVolumeMute(); }
                    let yPos = this.sliderMenuHeight - (e.layerY - (this.bufferSpaceY / 2));
                    let newVolume = (yPos / this.sliderMenuHeight);
                    if (newVolume <= 0.05) { newVolume = 0; }
                    if (newVolume >= 0.95) { newVolume = 1; }
                    this.setVolume(newVolume);
                }
            }
        });
        this.sliderMenu.appendChild(sliderMenuVisible.content);

        let sliderBarOuter = new Container({
            id: "VolumeSliderBarOuter",
            style: {
                width: "3px",
                height: `${this.sliderMenuHeight}px`,
                margin: `${(this.bufferSpaceY / 2)}px auto ${(this.bufferSpaceY / 2)}px auto`,
                borderRadius: "2px",
                backgroundColor: "rgb(200, 40, 40)",
                position: "relative",
                userSelect: "none",
                pointerEvents: "none",
            },
            events: {
                click: (e) => { e.stopPropagation(); }
            },
        });
        sliderMenuVisible.appendChild(sliderBarOuter.content);

        this.volumeSliderInner = new Container({
            id: "VolumeSliderBarInner",
            style: {
                width: "3px",
                height: "0%",
                borderRadius: "2px",
                backgroundColor: "rgb(100, 100, 100)",
                userSelect: "none",
                pointerEvents: "none",
            },
            events: {
                click: (e) => { e.stopPropagation(); }
            },
        });
        sliderBarOuter.appendChild(this.volumeSliderInner.content);

        this.volumeBarSlider = new Container({
            id: "VolumeSliderBarSlider",
            style: {
                width: `${this.moverSize}px`,
                height: `${this.moverSize}px`,
                borderRadius: "4px",
                backgroundColor: "rgb(200, 40, 40)",
                position: "absolute",
                left: "-3px",
                top: "-4px",
                userSelect: "none",
                pointerEvents: "none",
            },
            events: {
                click: (e) => { e.stopPropagation(); }
            },
        });
        sliderBarOuter.appendChild(this.volumeBarSlider.content);

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

    setVolume(volume) {
        if (this.setVolumeCallback) { this.setVolumeCallback(volume); }
        if (this.volumeSymbol && this.getVolumeCallback) { this.volumeSymbol.setSymbol(this.getVolumeSymbolClassName(volume)); }
        
        setStyle(this.volumeSliderInner.content, { height: Convert.RatioToPercent(1 - volume, true, true), });
        setStyle(this.volumeBarSlider.content, { top: `${Math.round(this.volumeSliderInner.content.offsetHeight) - Math.round(this.moverSize / 2)}px` });
    }

    toggleVolumeMute() {
        if (!this.muted) {
            this.muted = true;
            this.savedVolume = (this.getVolumeCallback ? this.getVolumeCallback() : 1.0);
            this.setVolume(0);
        }
        else {
            this.muted = false;
            let volume = ((this.savedVolume !== undefined) && (this.savedVolume !== null)) ? this.savedVolume : 1.0;
            this.setVolume(volume);
        }
    }
}