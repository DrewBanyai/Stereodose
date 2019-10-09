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
                height: "100%",
                display: "inline-block",
                position: "relative",
            },
        });

        this.trackImage = new Container({
            id: "TrackImage",
            style: {
                width: "30px",
                height: "30px",
                backgroundImage: "url(" + ((this.options && this.options.style) ? this.options.style.src : "") + ")",
                backgroundColor: "",
                backgroundRepeat: "round",
                position: "absolute",
                top: "-22px",
            },
        });
        container.appendChild(this.trackImage.content);

        this.trackUserNameLabel = new Label({
            id: "TrackUserLabel",
            attributes: {
                value: "",
            },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "10px",
                color: "rgb(160, 160, 160)",
                fontWeight: "500",
                position: "absolute",
                left: "42px",
                top: "-17px",
            }
        });
        container.appendChild(this.trackUserNameLabel.content);

        this.trackSongNameLabel = new Label({
            id: "TrackSongLabel",
            attributes: {
                value: "",
            },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "10px",
                color: "rgb(200, 200, 200)",
                fontWeight: "500",
                position: "absolute",
                left: "42px",
                top: "-5px",
            }
        });
        container.appendChild(this.trackSongNameLabel.content);

        return container.content;
    }

    setTrackData(trackData) {
        if (!trackData) { console.warn("Attempted to load invalid track data"); return; }
        if (trackData.artwork_url) { setStyle(this.trackImage.content, { backgroundImage: "url(" + trackData.artwork_url + ")", border: "1px solid rgba(200, 200, 200, 0.6)", }); }
        if (trackData.user && trackData.user.username) { this.trackUserNameLabel.setText(trackData.user.username); }
        if (trackData.title) { this.trackSongNameLabel.setText(trackData.title); }

        console.log(trackData);
        console.log(trackData.genre);
        console.log(trackData.permalink_url);
        console.log(trackData.tag_list);
    }
}