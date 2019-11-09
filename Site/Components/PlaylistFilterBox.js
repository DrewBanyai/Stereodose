
class PlaylistFilterBox {
    constructor(options) {
        this.options = options;
        this.elements = { playlistTypeUI: null, drugInputUI: null, moodInputUI: null, moodTitleLabel: null, moodListBox: null, };
        this.playlistType = "official";
        this.content = this.generateContent();
    }

    generateContent() {
        let container = new Container({
            id: "PlaylistFilterBox",
            style: {
                width: "580px",
                height: "90px",
                backgroundColor: "rgb(31, 31, 31)",
                borderRadius: "8px",
                textAlign: "center",
            },
        });

        container.appendChild(this.createPlaylistTypeUI());
        container.appendChild(this.createDrugInputUI());
        container.appendChild(this.createMoodInputUI());

        this.switchScreen("playlistTypeUI");

        return container.content;
    }

    createPlaylistTypeUI() {
        this.elements.playlistTypeUI = new Container({ id: "PlaylistTypeUIBox", style: { width: "580px", height: "90px", display: "none", verticalAlign: "middle", }, });

        let playlistTypeTitleLabel = new Label({
            id: "PlaylistTypeTitleLabel",
            attributes: { value: "PLAYLIST TYPE:" },
            style: {
                fontFamily: "'Staatliches', sans-serif",
                fontSize: "16px",
                color: "rgb(255, 255, 255)",
                margin: "0px 7px 0px 3px",
                display: "inline-block",
                position: "relative",
                top: "1px",
            }
        });
        this.elements.playlistTypeUI.appendChild(playlistTypeTitleLabel.content);

        let userPlaylistsButton = new PlaylistFilterButton({
            id: "UserPlaylistsButton",
            text: "USER PLAYLISTS",
            callback: () => {
                this.setPlaylistType("User");
                this.switchScreen("drugInputUI");
            }
        });
        this.elements.playlistTypeUI.appendChild(userPlaylistsButton.content);

        let officialPlaylistsButton = new PlaylistFilterButton({
            id: "OfficialPlaylistsButton",
            text: "OFFICIAL PLAYLISTS",
            callback: () => {
                this.setPlaylistType("Official");
                this.switchScreen("drugInputUI");
            }
        });
        this.elements.playlistTypeUI.appendChild(officialPlaylistsButton.content);

        return this.elements.playlistTypeUI.content;
    }

    setPlaylistType(type) {
        this.playlistType = type;
        this.elements.playlistTypeLabel.setValue(`${this.playlistType.toUpperCase()} PLAYLISTS`);
    }

    createDrugInputUI() {
        this.elements.drugInputUI = new Container({ id: "DrugInputUIBox", style: { width: "580px", height: "90px", display: "none", verticalAlign: "middle", }, });

        let titleAndBackButtonBox = new Container({ id: "DrugInputTitleAndBackButtonBox", style: { width: "100%", margin: "0px 0px 5px 0px", }, });
        this.elements.drugInputUI.appendChild(titleAndBackButtonBox.content);

        let backButtonSymbol = new Fontawesome({
            id: "DrugInputBackButtonSymbol",
            attributes: { className: "fas fa-chevron-circle-left" },
            style: {
                margin: "5px 5px 0px 0px",
                fontSize: "14px",
                color: "rgb(203, 203, 203)",
                cursor: "pointer",
                display: "inline-block",
            },
            events: {
                mouseenter: (e) => { e.target.style.color = "rgb(160, 160, 160)"; },
                mouseleave: (e) => { e.target.style.color = "rgb(203, 203, 203)"; },
                click: () => { this.switchScreen("playlistTypeUI"); }
            }
        });
        titleAndBackButtonBox.appendChild(backButtonSymbol.content);

        this.elements.playlistTypeLabel = new Label({
            id: "DrugInputPlaylistTypeTitleLabel",
            attributes: { value: "USER PLAYLISTS" },
            style: {
                fontFamily: "'Staatliches', sans-serif",
                fontSize: "16px",
                color: "rgb(255, 255, 255)",
                margin: "0px 7px 5px 3px",
                display: "inline-block",
                position: "relative",
                top: "1px",
            }
        });
        titleAndBackButtonBox.appendChild(this.elements.playlistTypeLabel.content);

        let selectDrugButtonBox = new Container({ id: "DrugInputSelectDrugButtonBox", style: { width: "100%", verticalAlign: "middle", }, });
        this.elements.drugInputUI.appendChild(selectDrugButtonBox.content);

        let selectDrugTitleLabel = new Label({
            id: "SelectDrugTitleLabel",
            attributes: { value: "SELECT DRUG:" },
            style: {
                fontFamily: "'Staatliches', sans-serif",
                fontSize: "14px",
                color: "rgb(255, 255, 255)",
                margin: "0px 7px 0px 3px",
                display: "inline-block",
            }
        });
        selectDrugButtonBox.appendChild(selectDrugTitleLabel.content);

        let substanceMap = SiteData.getSubstanceMap();
        for (let key in substanceMap) {
            let drugButton = new PlaylistFilterButton({ id: "DrugButton_" + substanceMap[key], text: substanceMap[key], callback: () => { this.createMoodButtons(key); this.switchScreen("moodInputUI"); } });
            selectDrugButtonBox.appendChild(drugButton.content);
        }

        return this.elements.drugInputUI.content;
    }

    createMoodInputUI() {
        this.elements.moodInputUI = new Container({ id: "MoodInputUIBox", style: { width: "580px", height: "90px", display: "none", verticalAlign: "middle", }, });

        let titleAndBackButtonBox = new Container({ id: "MoodInputTitleAndBackButtonBox", style: { width: "100%", margin: "0px 0px 5px 0px", }, });
        this.elements.moodInputUI.appendChild(titleAndBackButtonBox.content);

        let backButtonSymbol = new Fontawesome({
            id: "MoodInputBackButtonSymbol",
            attributes: { className: "fas fa-chevron-circle-left" },
            style: {
                margin: "5px 5px 0px 0px",
                fontSize: "14px",
                color: "rgb(203, 203, 203)",
                cursor: "pointer",
                display: "inline-block",
            },
            events: {
                mouseenter: (e) => { e.target.style.color = "rgb(160, 160, 160)"; },
                mouseleave: (e) => { e.target.style.color = "rgb(203, 203, 203)"; },
                click: () => { this.switchScreen("drugInputUI"); }
            }
        });
        titleAndBackButtonBox.appendChild(backButtonSymbol.content);

        this.elements.moodTitleLabel = new Label({
            id: "MoodInputPlaylistTypeTitleLabel",
            attributes: { value: "" },
            style: {
                fontFamily: "'Staatliches', sans-serif",
                fontSize: "16px",
                color: "rgb(255, 255, 255)",
                margin: "0px 7px 5px 3px",
                display: "inline-block",
                position: "relative",
                top: "1px",
            }
        });
        titleAndBackButtonBox.appendChild(this.elements.moodTitleLabel.content);

        let selectMoodButtonBox = new Container({ id: "MoodInputSelectMoodButtonBox", style: { width: "100%", }, });
        this.elements.moodInputUI.appendChild(selectMoodButtonBox.content);

        let selectMoodTitleLabel = new Label({
            id: "SelectMoodTitleLabel",
            attributes: { value: "SELECT YOUR MOOD:" },
            style: {
                fontFamily: "'Staatliches', sans-serif",
                fontSize: "14px",
                color: "rgb(255, 255, 255)",
                margin: "0px 7px 0px 3px",
                display: "inline-block",
            }
        });
        selectMoodButtonBox.appendChild(selectMoodTitleLabel.content);

        this.elements.moodListBox = new Container({ id: "MoodButtonBox", style: { display: "inline-block", } })
        selectMoodButtonBox.appendChild(this.elements.moodListBox.content);

        this.createMoodButtons(0);

        return this.elements.moodInputUI.content;
    }

    createMoodButtons(substanceID) {
        substanceID = parseInt(substanceID);
        while (this.elements.moodListBox.content.firstChild) { this.elements.moodListBox.content.removeChild(this.elements.moodListBox.content.firstChild); }

        let substanceMap = SiteData.getSubstanceMap();
        let moodMap = SiteData.getSubstanceMoods(substanceID);
        for (let key in moodMap) {  this.elements.moodListBox.appendChild((new PlaylistFilterButton({ id: "MoodButton_" + moodMap[key], text: moodMap[key], callback: () => { console.log(moodMap[key]); } })).content); }

        this.elements.moodTitleLabel.setValue(`USER PLAYLISTS  >  ${substanceMap[substanceID].toUpperCase()}`)
    }

    switchScreen(screenName) {
        setStyle(this.elements.playlistTypeUI.content, { display: "none", });
        setStyle(this.elements.drugInputUI.content, { display: "none", });
        setStyle(this.elements.moodInputUI.content, { display: "none", });

        setStyle(this.elements[screenName].content, { display: "table-cell", });
    }
}