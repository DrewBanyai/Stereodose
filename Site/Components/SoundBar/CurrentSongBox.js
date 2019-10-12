class CurrentSongBox {
    constructor(options) {
        this.options = options;
        this.trackImage = null;
        this.trackUserNameLabel = null;
        this.trackSongNameLabel = null;

        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: "CurrentSongBox",
            style: {
                width: "254px",
                display: "inline-block",
                position: "relative",
            },
        });
        if (this.options && this.options.style) { setStyle(container.content, this.options.style); }

        this.trackImage = new Container({
            id: "TrackImage",
            style: {
                width: "30px",
                height: "30px",
                backgroundImage: (this.options && this.options.style && this.options.style.src) ? ("url(" + this.options.style.src + ")") : "",
                backgroundColor: "",
                backgroundRepeat: "round",
                position: "absolute",
            },
        });
        container.appendChild(this.trackImage.content);

        this.trackUserNameLabel = new Label({
            id: "TrackUserLabel",
            attributes: { value: "", },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "10px",
                color: "rgb(160, 160, 160)",
                fontWeight: "500",
                position: "absolute",
                left: "42px",
                userSelect: "none",
            }
        });
        container.appendChild(this.trackUserNameLabel.content);

        this.trackSongNameLabel = new Label({
            id: "TrackSongLabel",
            attributes: { value: "", },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "10px",
                color: "rgb(200, 200, 200)",
                fontWeight: "500",
                position: "absolute",
                left: "42px",
                top: "10px",
                userSelect: "none",
            }
        });
        container.appendChild(this.trackSongNameLabel.content);

        return container.content;
    }

    setTrackData(trackData) {
        if (!trackData) { console.warn("Attempted to load invalid track data"); return; }
        if (trackData.artwork_url) { this.setImage(trackData.artwork_url); }
        if (trackData.user && trackData.user.username) { this.setUserName(trackData.user.username); }
        if (trackData.title) { this.setSongName(trackData.title); }
    }

    clear() {
        this.setImage(null);
        this.setUserName("");
        this.setSongName("");
    }

    setImage(imageURL) { setStyle(this.trackImage.content, { backgroundImage: (imageURL ? "url(" + imageURL + ")" : ""), border: (imageURL ? "1px solid rgba(200, 200, 200, 0.6)" : ""), }); }
    setUserName(userName) { this.trackUserNameLabel.setText(userName); }
    setSongName(songName) { this.trackSongNameLabel.setText(songName); }
}