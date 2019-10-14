class TrackPreview {
    constructor(options) {
        this.options = options;
        this.trackData = (options && options.trackData) ? options.trackData : null;
        this.content = this.generateContent();

        this.content.getTrackLink = () => { return this.getTrackLink(); }
    }

    generateContent() {
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "TrackPreview",
            style: {
                width: "100%",
            },
        });

        let trackNumberBox = new Container({
            id: "TrackNumberBox",
            style: {
                width: "7%",
                height: "100%",
                display: "inline-flex",
            }
        });
        container.appendChild(trackNumberBox.content);

        this.trackNumberLabel = new Label({
            id: "TrackNumberLabel",
            attributes: { value: (this.options && this.options.trackNumber) ? this.options.trackNumber : "?" },
            style: {
                color: "rgb(200, 200, 200)",
                fontSize: "16px",
                margin: "auto",
                position: "relative",
                top: "-18px",
            },
        });
        trackNumberBox.appendChild(this.trackNumberLabel.content);

        let trackDataBox = new Container({
            id: "TrackDataBox",
            style: {
                width: "93%",
                height: "100%",
                margin: "3px 0px 3px 0px",
                borderRadius: "6px",
                backgroundColor: "rgb(96, 96, 96)",
                display: "inline-flex",
            }
        });
        container.appendChild(trackDataBox.content);

        this.trackImage = new Container({
            id: "TrackImage",
            style: {
                width: "50px",
                height: "50px",
                margin: "5px 5px 5px 5px",
                backgroundImage: (this.trackData && this.trackData.artwork_url) ? ("url(" + this.trackData.artwork_url + ")") : "",
                backgroundColor: "",
                backgroundRepeat: "round",
            },
        });
        trackDataBox.appendChild(this.trackImage.content);

        let trackDataContainer = new Container({
            id: "TrackDataContainer",
            style: { height: "100%", margin: "5px 5px 5px 5px", }
        });
        trackDataBox.appendChild(trackDataContainer.content);

        let trackUserNameLabel = new Label({
            id: "TrackUserLabel",
            attributes: { value: (this.trackData && this.trackData.user && this.trackData.user.username) ? this.trackData.user.username : "", },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "10px",
                color: "rgb(160, 160, 160)",
                fontWeight: "500",
                userSelect: "none",
            }
        });
        trackDataContainer.appendChild(trackUserNameLabel.content);

        let trackSongNameLabel = new Label({
            id: "TrackSongLabel",
            attributes: { value: (this.trackData && this.trackData.title) ? this.trackData.title : "", },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "10px",
                color: "rgb(200, 200, 200)",
                fontWeight: "500",
                userSelect: "none",
            }
        });
        trackDataContainer.appendChild(trackSongNameLabel.content);

        return container.content;
    }

    setTrackNumber(number) { this.trackNumberLabel.setValue(number); }
    getTrackLink() { return (this.options && this.options.trackLink) ? this.options.trackLink : ""; }
}