class PlaylistDisplay {
    constructor(options) {
        this.options = options;
        this.elements = { image: null, name: null, desc: null };
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
                width: "100%",
                height: "160px",
                display: "inline-flex",
                borderRadius: "8px",
                backgroundColor: "rgb(30, 30, 40)",
                cursor: "pointer",
                transition: "transform 0.13s linear 0s",
                transform: "scale(1)",
                boxShadow: "rgba(80, 80, 80, 0.16) 0px 0px 5px 0px, rgba(80, 80, 80, 0.12) 0px 4px 10px",
                margin: "5px 0px 5px 0px",
            },
            events: {
                mouseenter: () => { setStyle(this.content, { transform: "scale(1.025)", boxShadow: "rgba(120, 120, 120, 0.16) 0px 0px 5px 0px, rgba(120, 120, 120, 0.12) 0px 4px 10px", }); },
                mouseleave: () => { setStyle(this.content, { transform: "scale(1.000)", boxShadow: "rgba(80, 80, 80, 0.16) 0px 0px 5px 0px, rgba(80, 80, 80, 0.12) 0px 4px 10px", }); },
                click: async () => {
                    if (!this.trackList) { console.warn("No tracklist available..."); return; }
                    SitewideSoundBar.setPlaylistID(this.options.data._id);
                    await SitewideSoundBar.player.loadTrackLinks(this.trackList);
                }
            }
        });

        this.elements.image = new Container({
            id: "PlaylistImage",
            style: {
                width: "160px",
                height: "100%",
                backgroundRepeat: "round",
                borderRadius: "8px 0px 0px 8px",
                userSelect: "none",
            },
        });
        container.appendChild(this.elements.image.content);

        let dataSection = new Container({
            id: "PlaylistDataSection",
            style: { height: "100%", },
        });
        container.appendChild(dataSection.content);

        this.elements.name = new Label({
            id: "PlaylistName",
            attributes: { value: "" },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "16px",
                color: "rgb(200, 200, 200)",
                fontWeight: "bold",
                margin: "20px 0px 0px 20px",
                userSelect: "none",
            }
        });
        dataSection.appendChild(this.elements.name.content);

        this.elements.desc = new Label({
            id: "PlaylistDescription",
            attributes: { value: "" },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "14px",
                color: "rgb(200, 200, 200)",
                fontWeight: "500",
                margin: "10px 0px 0px 20px",
                userSelect: "none",
            }
        });
        dataSection.appendChild(this.elements.desc.content);

        return container.content;
    }

    setImage(imageURL) { setStyle(this.elements.image.content, { backgroundImage: "url(" + imageURL + ")", }); }
    setPlaylistName(playlistName) { this.elements.name.setValue(playlistName); }
    setPlaylistDesc(playlistDesc) { this.elements.desc.setValue(playlistDesc); }
    setTrackList(trackList) { this.trackList = trackList; }
}