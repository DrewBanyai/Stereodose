let MainContent = null;

let SitewideHeader = null;
let SitePageContent = null;
let SitewideSoundBar = null;

let LoadPage = (page) => {
	if (SitePageContent === null) { console.error("SitePageContent is null! Can not load new page"); return; }
	if (page === undefined || page === null) { console.error("Given page is undefined or null! Can not load new page"); return; }
	
	SitePageContent.innerHTML = "";
	SitePageContent.appendChild(page.content);
}

let LoadMainPage = (options = {}) => { LoadPage(new LandingPage(options)); }
let LoadPlaylistPage = (playlistID) => { LoadPage(new ViewPlaylist({ playlistID: playlistID })); }
let LoadAccountPage = (accountID) => { LoadPage(new ViewAccount({ accountID: accountID })); }

let LoadSiteContent = async () => {
	//  Load the default first page users should see
	loadSiteHeader();
	loadMainContent();
	loadSoundBar();

	//  Check for URL variables
	let urlVars = getUrlVars();
	if (urlVars && (urlVars !== {})) {
		if (urlVars.hasOwnProperty("playlistID")) { LoadPlaylistPage(urlVars.playlistID); return; }
		else if (urlVars.hasOwnProperty("viewAccount")) { LoadAccountPage(urlVars.viewAccount); return; }
	}

	LoadMainPage();
}

let loadSiteHeader = () => {
	//  The SiteHeader which will be attached to the top of the screen and persists across all pages
	SitewideHeader = new SiteHeader({});
	document.body.appendChild(SitewideHeader.content);
}

let loadMainContent = () => {
	document.body.style.backgroundColor = "rgb(16, 16, 16)";

	//  The SitePageContent which will be between the site header and soundbar, and will switch with different pages
	let pageContent = new Container({ id: "PageContent", style: { width: "100%", height: "100%", textAlign: "center", padding: "0px 0px 60px 0px" } });
	document.body.appendChild(SitePageContent = pageContent.content);
}

let loadSoundBar = async () => {
	//  The SoundBar which will be attached to the bottom of the screen and persists across all pages
	SitewideSoundBar = new SoundBar({});
	document.body.appendChild(SitewideSoundBar.content);
}

let getUrlVars = () => {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { vars[key] = value; });
    return vars;
}

let addStyle = (style1, style2) => {
	if (!style1 || !style2) { console.warn("Can not run addStyle with invalid or null style objects"); }
	let newStyle = {};
	for (let key in style1) { newStyle[key] = style1[key]; }
	for (let key in style2) { newStyle[key] = style2[key]; }
	return newStyle;

}

let setStyle = (container, style) => {
	//  Ensure we have a proper container, a proper style, and that the style passed in isn't empty
	if (!container) { console.log("Invalid container was passed into setStyle"); return; }
	if (!style) { console.log("Invalid style was passed into setStyle"); return; }
	if (Object.keys(style).length === 0) { return; }

	for (let key in style) { container.style[key] = style[key]; }
}

let setAttributes = (container, attributes) => {
	//  Ensure we have a proper container, a proper style, and that the attributes passed in isn't empty
	if (!container) { console.log("Invalid container was passed into setStyle"); return; }
	if (!attributes) { console.log("Invalid attributes was passed into setAttributes"); return; }
	if (Object.keys(attributes).length === 0) { return; }

	for (let key in attributes) { container.setAttribute(key, attributes[key]); }
}

let clearChildren = (container) => {
	while (container.firstChild) { container.removeChild(container.firstChild); }
}