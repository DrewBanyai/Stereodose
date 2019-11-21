class PlaylistDisplay {
    constructor(options) {
        this.options = options;
        this.elements = { image: null, playButton: null, name: null, desc: null, favoriteIcon: null, hiddenIcon: null };
        this.trackList = (options && options.data) ? options.data.trackList : [];
        this.status = { favorited: false, hidden: false };
        this.playlistData = { imageLink: null, playlistName: null, playlistDesc: null };
        this.content = this.generateContent();
        PostOffice.addAuthListener(this);
    }

    generateContent() {
        if (!this.options) { console.warn("Can not create a PlaylistDisplay without options"); return null; }
        if (!this.options.data) { console.warn("Can not create a PlaylistDisplay without data in options"); return null; }
        if (!this.options.mode) { console.warn("Can not create a PlaylistDisplay without mode in options"); return null; }
        let playlistPage = (this.options && (this.options.mode === "ViewPlaylist"));
        let createPage = (this.options && (this.options.mode === "CreatePlaylist"));
        
        if (!createPage && !this.options.data.creator) { console.warn("Can not create a PlaylistDisplay without a creator"); return null; }
        if (!createPage && !this.options.data.imageSource) { console.warn("Can not create a PlaylistDisplay without an image source"); return null; }
        if (!createPage && !this.options.data.name) { console.warn("Can not create a PlaylistDisplay without a playlist name"); return null; }
        if (!createPage && !this.options.data.description) { console.warn("Can not create a PlaylistDisplay without a playlist description"); return null; }
        if (!createPage && !this.options.data.trackList) { console.warn("Can not create a PlaylistDisplay without a track list"); return null; }
        if (!createPage && !this.options.data.hasOwnProperty("hidden")) { console.warn("Can not create a PlaylistDisplay without a hidden value"); return null; }
        if (!createPage && !this.options.data._id) { console.warn("Can not create a PlaylistDisplay without a playlist ID"); return null; }

        let setImageLink = null;

        let chooseImagePopup = async () => {
            let popup = new SetImageLinkPopup({ submissionCallback: (link) => { if (setImageLink) { setImageLink(link); } } });
            document.body.appendChild(popup.content);
        };

        let loadPlaylist = async () => {
            if (!this.trackList) { console.warn("No tracklist available..."); return; }

            if (!playlistPage) { LoadPlaylistPage(this.options.data._id); return; }
            
            if (SitewideSoundBar.getPlaylistID() === this.options.data._id) { SitewideSoundBar.playIfPaused(); }
            else {
                SitewideSoundBar.setPlaylistID(this.options.data._id);
                await SitewideSoundBar.player.loadTrackLinks(this.trackList);
            }
        };

        let container = new Container({
            id: (this.options && this.options.id) ? this.options.id : "PlaylistDisplay",
            style: {
                width: "100%",
                height: "160px",
                display: "inline-flex",
                borderRadius: playlistPage ? "" : "8px",
                backgroundColor: playlistPage ? "" : "rgb(30, 30, 40)",
                cursor: createPage ? "" : "pointer",
                transition: "transform 0.13s linear 0s",
                transform: "scale(1)",
                boxShadow: playlistPage ? "" : "rgba(80, 80, 80, 0.16) 0px 0px 5px 0px, rgba(80, 80, 80, 0.12) 0px 4px 10px",
                margin: "5px 0px 5px 0px",
                textAlign: "left",
            },
            events: {
                mouseenter: (createPage || playlistPage) ? null : () => { setStyle(this.content, { transform: "scale(1.025)", boxShadow: "rgba(120, 120, 120, 0.16) 0px 0px 5px 0px, rgba(120, 120, 120, 0.12) 0px 4px 10px", }); },
                mouseleave: (createPage || playlistPage) ? null : () => { setStyle(this.content, { transform: "scale(1.000)", boxShadow: "rgba(80, 80, 80, 0.16) 0px 0px 5px 0px, rgba(80, 80, 80, 0.12) 0px 4px 10px", }); },
            }
        });

        this.elements.image = new Container({
            id: "PlaylistImage",
            style: {
                width: "160px",
                height: "100%",
                borderRadius: (playlistPage || createPage) ? "8px 8px 8px 8px" : "8px 0px 0px 8px",
                backgroundImage: createPage ? "" : `url(${this.options.data.imageSource})`,
                border: createPage ? "1px solid rgb(200, 200, 200" : "",
                backgroundRepeat: "round",
                userSelect: "none",
                position: "relative",
                cursor: createPage ? "pointer" : "",
                textAlign: "center",
            },
            events: {
                click: createPage ? chooseImagePopup : loadPlaylist,
                mouseenter: playlistPage ? (() => setStyle(this.elements.playButton.content, { visibility: "visible" })) : (() => {}),
                mouseleave: playlistPage ? (() => setStyle(this.elements.playButton.content, { visibility: "hidden" })) : (() => {}),
            },
        });
        container.appendChild(this.elements.image.content);

        setImageLink = (link) => {
            if (this.elements.image) { setStyle(this.elements.image.content, { backgroundImage: `url(${link})`, }); }
            if (this.elements.choosePictureLabel) { setStyle(this.elements.choosePictureLabel.content, { display: "none" }); }
            this.playlistData.imageLink = link;
        };

        if (createPage) {
            this.elements.choosePictureLabel = new Label({
                id: "ChoosePictureLabel",
                attributes: { value: "Choose Playlist Thumbnail" },
                style: {
                    margin: "60px 0px 0px 0px",
                    fontFamily: "'Titillium Web', sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "rgb(200, 200, 200)",
                    display: "block",
                },
            });
            this.elements.image.appendChild(this.elements.choosePictureLabel.content);
        }

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
            events: { click: (createPage ? (() => {}) : loadPlaylist), },
        });
        container.appendChild(dataSection.content);

        this.elements.name = new Label({
            id: "PlaylistName",
            attributes: { value: createPage ? "Name your playlist (click here)" : this.options.data.name },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: (createPage ? "20px" : "16px"),
                width: "600px",
                height: "23px",
                color: "rgb(200, 200, 200)",
                fontWeight: "bold",
                margin: "20px 0px 0px 20px",
                userSelect: "none",
                overflow: "hidden",
                backgroundColor: (createPage ? "rgb(40, 40, 40)" : ""),
            },
            events: {
                keyup: () => { this.playlistData.playlistName = this.elements.name.getValue().substr(0, 400); },
                change: () => {},
                paste: () => { this.playlistData.playlistName = this.elements.name.getValue().substr(0, 400); },
            }
        });
        if (createPage) { this.elements.name.content.contentEditable = true; }
        dataSection.appendChild(this.elements.name.content);

        this.elements.desc = new Label({
            id: "PlaylistDescription",
            attributes: { value: createPage ? "Describe your playlist in 400 characters or less (click here)" : this.options.data.description },
            style: {
                fontFamily: "'Titillium Web', sans-serif",
                fontSize: "14px",
                width: "600px",
                height: "90px",
                color: "rgb(200, 200, 200)",
                fontWeight: createPage ? "bold" : "500",
                margin: "10px 70px 0px 20px",
                userSelect: "none",
                overflowX: "hidden",
                overflowY: "auto",
                backgroundColor: (createPage ? "rgb(40, 40, 40)" : ""),
            },
            events: {
                keyup: () => { this.playlistData.playlistDesc = this.elements.desc.getValue().substr(0, 400); },
                change: () => {},
                paste: () => { this.playlistData.playlistDesc = this.elements.desc.getValue().substr(0, 400); },
            }
        });
        if (createPage) { this.elements.desc.content.maxlength = "400"; this.elements.desc.content.contentEditable = true; }
        dataSection.appendChild(this.elements.desc.content);

        if (!createPage) { this.loadFavoriteAndHiddenIcons(container); }

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