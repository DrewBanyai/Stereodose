class PlaylistDisplay {
    constructor(options) {
        this.options = options;
        this.playlistImage = null;
        this.playlistName = null;
        this.trackList = null;
        this.content = this.generateContent();

        if (options.data) {
            this.setImage(options.data.imageSource);
            this.setPlaylistName(options.data.name);
            this.setPlaylistDesc(options.data.description);
            this.setTrackList(options.data.trackList);
        }
    }

    generateContent() {
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "PlaylistDisplay",
            style: {
                width: "700px",
                height: "160px",
                display: "inline-flex",
            },
        });

        this.playlistImage = new Container({
            id: "PlaylistImage",
            style: {
                width: "160px",
                height: "160px",
                border: "1px solid rgba(200, 200, 200, 0.6)",
                backgroundRepeat: "round",
                cursor: "pointer",
            },
            events: {
                click: async () => {
                    if (!this.trackList) { console.log("No tracklist available..."); return; }
                    await SitewideSoundBar.player.loadTrackLinks(this.trackList);
                }
            }
        });
        container.appendChild(this.playlistImage.content);

        let dataSection = new Container({
            id: "PlaylistDataSection",
            style: {
                width: "540px",
                height: "160px",
            },
        });
        container.appendChild(dataSection.content);

        this.playlistName = new Label({
            id: "PlaylistName",
            attributes: { value: "" },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "16px",
                color: "rgb(200, 200, 200)",
                fontWeight: "500",
                margin: "20px 0px 0px 20px",
            }
        });
        dataSection.appendChild(this.playlistName.content);

        this.playlistDesc = new Label({
            id: "PlaylistDescription",
            attributes: { value: "" },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "16px",
                color: "rgb(200, 200, 200)",
                fontWeight: "500",
                margin: "20px 0px 0px 20px",
            }
        });
        dataSection.appendChild(this.playlistDesc.content);

        return container.content;
    }

    setImage(imageURL) { setStyle(this.playlistImage.content, { backgroundImage: "url(" + imageURL + ")", border: "1px solid rgba(200, 200, 200, 0.6)", }); }
    setPlaylistName(playlistName) { this.playlistName.setValue(playlistName); }
    setPlaylistDesc(playlistDesc) { this.playlistDesc.setValue(playlistDesc); }
    setTrackList(trackList) { this.trackList = trackList; }
}