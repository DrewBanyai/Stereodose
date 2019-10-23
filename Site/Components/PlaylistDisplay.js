class PlaylistDisplay {
    constructor(options) {
        this.options = options;
        this.elements = { image: null, playButton: null, name: null, desc: null, favoriteIcon: null, hiddenIcon: null };
        this.trackList = (options && options.data) ? options.data.trackList : [];
        this.status = { favorited: false, hidden: false };
        this.content = this.generateContent();
        PostOffice.addAuthListener(this);
    }

    generateContent() {
        if (!this.options) { console.warn("Can not create a PlaylistDisplay without options"); return null; }
        if (!this.options.data) { console.warn("Can not create a PlaylistDisplay without data in options"); return null; }
        if (!this.options.data.creator) { console.warn("Can not create a PlaylistDisplay without a creator"); return null; }
        if (!this.options.data.imageSource) { console.warn("Can not create a PlaylistDisplay without an image source"); return null; }
        if (!this.options.data.name) { console.warn("Can not create a PlaylistDisplay without a playlist name"); return null; }
        if (!this.options.data.description) { console.warn("Can not create a PlaylistDisplay without a playlist description"); return null; }
        if (!this.options.data.trackList) { console.warn("Can not create a PlaylistDisplay without a track list"); return null; }
        if (!this.options.data.hasOwnProperty("hidden")) { console.warn("Can not create a PlaylistDisplay without a hidden value"); return null; }
        if (!this.options.data._id) { console.warn("Can not create a PlaylistDisplay without a playlist ID"); return null; }

        let loadPlaylist = async () => {
            if (!this.trackList) { console.warn("No tracklist available..."); return; }

            if (!playlistPage) { LoadPage(new ViewPlaylist({ playlistID: this.options.data._id })); return; }
            SitewideSoundBar.setPlaylistID(this.options.data._id);
            await SitewideSoundBar.player.loadTrackLinks(this.trackList);
        };

        let playlistPage = (this.options && (this.options.mode === "ViewPlaylist"));
        
        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "PlaylistDisplay",
            style: {
                width: "100%",
                height: "160px",
                display: "inline-flex",
                borderRadius: playlistPage ? "" : "8px",
                backgroundColor: playlistPage ? "" : "rgb(30, 30, 40)",
                cursor: "pointer",
                transition: "transform 0.13s linear 0s",
                transform: "scale(1)",
                boxShadow: playlistPage ? "" : "rgba(80, 80, 80, 0.16) 0px 0px 5px 0px, rgba(80, 80, 80, 0.12) 0px 4px 10px",
                margin: "5px 0px 5px 0px",
            },
            events: {
                mouseenter: playlistPage ? null : () => { setStyle(this.content, { transform: "scale(1.025)", boxShadow: "rgba(120, 120, 120, 0.16) 0px 0px 5px 0px, rgba(120, 120, 120, 0.12) 0px 4px 10px", }); },
                mouseleave: playlistPage ? null : () => { setStyle(this.content, { transform: "scale(1.000)", boxShadow: "rgba(80, 80, 80, 0.16) 0px 0px 5px 0px, rgba(80, 80, 80, 0.12) 0px 4px 10px", }); },
            }
        });

        this.elements.image = new Container({
            id: "PlaylistImage",
            style: {
                width: "160px",
                height: "100%",
                borderRadius: "8px 0px 0px 8px",
                backgroundImage: `url(${this.options.data.imageSource})`,
                backgroundRepeat: "round",
                userSelect: "none",
                position: "relative",
            },
            events: {
                click: loadPlaylist,
                mouseenter: playlistPage ? (() => setStyle(this.elements.playButton.content, { visibility: "visible" })) : (() => {}),
                mouseleave: playlistPage ? (() => setStyle(this.elements.playButton.content, { visibility: "hidden" })) : (() => {}),
            },
        });
        container.appendChild(this.elements.image.content);

        this.elements.playButton = new Fontawesome({
            id: "PlaylistPlayButton",
            attributes: { className: "fas fa-play" },
            style: {
                color: "rgba(200, 200, 200, 0.95)",
                fontSize: "72px",
                visibility: "hidden",
                position: "absolute",
                top: "40px",
                left: "50px",
            }
        });
        this.elements.image.appendChild(this.elements.playButton.content);

        let dataSection = new Container({
            id: "PlaylistDataSection",
            style: { width: "760px", height: "100%", },
            events: { click: loadPlaylist, },
        });
        container.appendChild(dataSection.content);

        this.elements.name = new Label({
            id: "PlaylistName",
            attributes: { value: this.options.data.name },
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
            attributes: { value: this.options.data.description },
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

        this.loadFavoriteAndHiddenIcons(container);

        return container.content;
    }

    async loadFavoriteAndHiddenIcons(container) {
        if (await PostOffice.getAuthentication()) {
            this.elements.favoriteIcon = new Fontawesome({
                id: "PlaylistFavoriteIcon",
                attributes: { className: "fas fa-heart"},
                style: { fontSize: "15px", color: "rgb(100, 100, 100)", margin: "0px 5px 0px 0px", display: "inline-block", position: "absolute", top: "10px", right: "10px", },
                events: {
                    mouseenter: (e) => { setStyle(this.elements.favoriteIcon.content, { color: (this.status.favorited ? "rgb(120, 120, 120)" : "rgb(255, 70, 70)") }); },
                    mouseleave: (e) => { setStyle(this.elements.favoriteIcon.content, { color: (this.status.favorited ? "rgb(255, 40, 40)" : "rgb(100, 100, 100)") }); },
                    click: async (e) => { this.status.favorited = !this.status.favorited; PostOffice.PlaylistFavorite(this.options.data._id, this.status.favorited); },
                },
            })
            container.appendChild(this.elements.favoriteIcon.content);
        }
        
        let auth = await PostOffice.getAuthentication();
        if (auth && auth.user && (this.options.data.creator === auth.user.username)) {
            this.elements.hiddenIcon = new Fontawesome({
                id: "PlaylistHiddenIcon",
                attributes: { className: "fas fa-eye"},
                style: { fontSize: "15px", color: "rgb(100, 100, 100)", margin: "0px 5px 0px 0px", display: "inline-block", position: "absolute", top: "30px", right: "10px", },
                events: {
                    mouseenter: (e) => { setStyle(this.elements.hiddenIcon.content, { color: (this.status.hidden ? "rgb(120, 120, 120)" : "rgb(70, 70, 255)") }); },
                    mouseleave: (e) => { setStyle(this.elements.hiddenIcon.content, { color: (this.status.hidden ? "rgb(40, 40, 255)" : "rgb(100, 100, 100)") }); },
                    click: async (e) => { this.status.hidden = !this.status.hidden; await PostOffice.PlaylistSetHidden(this.options.data._id, this.status.hidden); },
                },
            })
            container.appendChild(this.elements.hiddenIcon.content);
            
            this.status.hidden = this.options.data.hidden;
            this.setHiddenState(this.status.hidden);
        }
        
        this.setFavoriteState();
    }

    async setFavoriteState() {
        if (!this.elements.favoriteIcon) { return; }

        let authData = await PostOffice.getAuthentication();
        this.status.favorited = authData ? authData.user.favoritePlaylists.includes(this.options.data._id) : false;
        setStyle(this.elements.favoriteIcon.content, { color: this.status.favorited ? "rgb(255, 40, 40)" : "rgb(100, 100, 100)" })
    }

    async setHiddenState(hidden) {
        if (!this.elements.hiddenIcon) { return; }

        this.status.hidden = hidden;
        setStyle(this.elements.hiddenIcon.content, { color: this.status.hidden ? "rgb(40, 40, 255)" : "rgb(100, 100, 100)" });
        setAttributes(this.elements.hiddenIcon.content, { className: (this.status.hidden ? "fas fa-eye-slash" : "fas fa-eye"), });
    }
}