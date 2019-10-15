class TrackPreview {
    constructor(options) {
        this.options = options;
        this.trackData = (options && options.trackData) ? options.trackData : null;
        this.trackNumber = (options && options.trackNumber) ? options.trackNumber : -1;
        this.optionBox = { sortUp: null, remove: null, sortDown: null };
        this.content = this.generateContent();

        this.setTrackNumber(((options && options.trackNumber) ? options.trackNumber : 0), ((options && options.fullCount) ? options.fullCount : 0));

        this.content.setTrackNumber = (number, fullCount) => { return this.setTrackNumber(number, fullCount); }
        this.content.getTrackLink = () => { return this.getTrackLink(); }
    }

    generateContent() {
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "TrackPreview",
            style: {
                width: "100%",
            },
        });

        let trackNumberBox = new Container({ id: "TrackNumberBox", style: { width: "7%", height: "100%", display: "inline-flex", } });
        container.appendChild(trackNumberBox.content);

        let trackDataBox = new Container({ id: "TrackDataBox", style: { width: "90%", height: "100%", margin: "3px 0px 3px 0px", borderRadius: "6px 0px 0px 6px", backgroundColor: "rgb(96, 96, 96)", display: "inline-flex", } });
        container.appendChild(trackDataBox.content);

        let trackOptionsBox = new Container({ id: "TrackOptionsBox", style: { width: "3%", height: "60px", margin: "3px 0px 3px 0px", borderRadius: "0px 6px 6px 0px", backgroundColor: "rgb(80, 80, 80)", display: "inline-block", position: "relative", top: "-1px", } });
        container.appendChild(trackOptionsBox.content);

        this.loadTrackNumberBoxContents(trackNumberBox);
        this.loadTrackDataBoxContents(trackDataBox);
        this.loadTrackOptionsBoxContents(trackOptionsBox);

        return container.content;
    }

    loadTrackNumberBoxContents(trackNumberBox) {
        this.trackNumberLabel = new Label({
            id: "TrackNumberLabel",
            attributes: { value: "?" },
            style: {
                color: "rgb(200, 200, 200)",
                fontSize: "16px",
                margin: "auto",
                position: "relative",
                top: "-18px",
            },
        });
        trackNumberBox.appendChild(this.trackNumberLabel.content);
    }

    loadTrackDataBoxContents(trackDataBox) {
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
            style: styleTemplate.SongPreviewUser,
        });
        trackDataContainer.appendChild(trackUserNameLabel.content);

        let trackSongNameLabel = new Label({
            id: "TrackSongLabel",
            attributes: { value: (this.trackData && this.trackData.title) ? this.trackData.title : "", },
            style: styleTemplate.SongPreviewTitle,
        });
        trackDataContainer.appendChild(trackSongNameLabel.content);
    }

    loadTrackOptionsBoxContents(trackOptionsBox) {
        this.optionBox.sortUp = new Container({ id: "Icon1Box", position: "relative", });
        this.optionBox.remove = new Container({ id: "Icon2Box", position: "relative", });
        this.optionBox.sortDown = new Container({ id: "Icon3Box", position: "relative", });
        trackOptionsBox.appendChild(this.optionBox.sortUp.content);
        trackOptionsBox.appendChild(this.optionBox.remove.content);
        trackOptionsBox.appendChild(this.optionBox.sortDown.content);
        this.optionBox.sortUp.appendChild((new Fontawesome({ id: "TrackSortUpIcon", attributes: { className: "fas fa-sort-up" }, style: { fontSize: "18px", color: "rgb(160, 160, 160)", position: "relative", left: "8px", top: "5px", cursor: "pointer", }, events: { click: () => { this.swapEntries(this.trackNumber, this.trackNumber - 1); }, } })).content);
        this.optionBox.remove.appendChild((new Fontawesome({ id: "TrackRemoveIcon", attributes: { className: "fas fa-window-close" }, style: { fontSize: "16px", color: "rgb(160, 160, 160)", position: "relative", left: "6px", top: "2px", cursor: "pointer", }, events: { click: () => { this.removeEntry(); }, } })).content);
        this.optionBox.sortDown.appendChild((new Fontawesome({ id: "TrackSortDownIcon", attributes: { className: "fas fa-sort-down" }, style: { fontSize: "18px", color: "rgb(160, 160, 160)", position: "relative", left: "8px", top: "-2px", cursor: "pointer", }, events: { click: () => { this.swapEntries(this.trackNumber, this.trackNumber + 1); }, } })).content);
    }

    swapEntries(entryA, entryB) { if (this.options.swapFunc) { this.options.swapFunc(entryA, entryB); } }

    removeEntry() {
        this.content.parentElement.removeChild(this.content);
    }

    setTrackNumber(number, fullCount) {
        this.trackNumber = number;
        this.trackNumberLabel.setValue(number);
        setStyle(this.optionBox.sortUp.content, { visibility: (number === 1) ? "hidden" : "visible" });
        setStyle(this.optionBox.sortDown.content, { visibility: (number === fullCount) ? "hidden" : "visible" });
    }

    getTrackLink() { return (this.options && this.options.trackLink) ? this.options.trackLink : ""; }
}