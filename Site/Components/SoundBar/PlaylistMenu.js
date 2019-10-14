class PlaylistMenu {
    constructor(options) {
        this.options = options;
        this.playlistMenuBox = null;
        this.menuOpen = false;
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: "PlaylistMenu",
            style: {
                width: "40px",
                height: "40px",
                display: "inline-block",
                position: "relative",
            },
        });

        let playlistIcon = new Fontawesome({
            id: "PlaylistIcon",
            attributes: { className: "fas fa-list-ul" },
            style: { fontSize: "15px", color: "rgb(100, 100, 100)", margin: "0px 5px 0px 0px", },
            events: {
                mouseenter: (e) => { setStyle(playlistIcon.content, { color: this.menuOpen ? "rgb(120, 120, 120)" : "rgb(160, 160, 160)" }); },
                mouseleave: (e) => { setStyle(playlistIcon.content, { color: this.menuOpen ? "rgb(100, 100, 200)" : "rgb(100, 100, 100)" }); },
                click: (e) => { this.menuOpen = !this.menuOpen; setStyle(this.playlistMenuBox.content, { display: this.menuOpen ? "" : "none" }) },

            },
        });
        container.appendChild(playlistIcon.content);

        container.appendChild(this.createPlaylistMenuBox());

        return container.content;
    }

    createPlaylistMenuBox() {
        let topPaddingPixels = 2;
        this.playlistMenuBox = new Container({
            id: "PlaylistMenuBox",
            style: {
                width: "331px",
                maxHeight: `${34 * config.MaximumSongsPerPlaylist + topPaddingPixels}px`,
                minHeight: "0px",
                position: "absolute",
                bottom: "58px",
                right: "0px",
                backgroundColor: "rgb(40, 40, 40)",
                border: "1px solid rgba(200, 200, 200, 0.5)",
                padding: `${topPaddingPixels}px 0px 0px 2px`,
                textAlign: "left",
                display: "none",
            },
        });

        return this.playlistMenuBox.content;
    }

    loadPlaylistData(playlistData) {
        this.clear();
        for (let i = 0; i < playlistData.trackList.length; ++i) {
            let trackData = playlistData.trackData[playlistData.trackList[i]];
            let songBox = new SongDisplayBox({ style: { display: "", width: "331px", height: "34px" } });
            songBox.setTrackData(trackData);
            this.playlistMenuBox.appendChild(songBox.content);
        }
    }

    clear() { clearChildren(this.playlistMenuBox.content); }
}