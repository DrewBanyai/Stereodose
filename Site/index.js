let MainContent = null;

let SiteName = "Stereodose Redux";
let SiteWidth = "920px";

let SitewideSoundBar = null;

function LoadPage(page) {
	if (MainContent === null) {
		console.log("MainContent is null! Can not load new page");
		return;
	}
	if (page === undefined || page === null) {
		console.log("Given page is undefined or null! Can not load new page");
		return;
	}
	
	MainContent.innerHTML = "";
	MainContent.appendChild(page.content);
}

function LoadSiteContent() {
	MainContent = document.getElementById("Stereodose_Redux");
	MainContent.style.width = "100%";
	
	//  Load the default first page users should see
	LoadPage(new MainPage());
	loadSoundBar();
}

let loadSoundBar = async () => {
	//  The SoundBar which will be attached to the bottom of the screen and persists across all pages
	SitewideSoundBar = new SoundBar({});
	document.body.appendChild(SitewideSoundBar.content);

	//  DEBUG: Load a test playlist
	let result = await PostOffice.GetTestPlaylist();
	if (result && SitewideSoundBar && SitewideSoundBar.player) { await SitewideSoundBar.player.loadTrackLinks(result.TrackList); }
}

function setStyle(container, style) {
	//  Ensure we have a proper container, a proper style, and that the style passed in isn't empty
	if (!container) { console.log("Invalid container was passed into setStyle"); return; }
	if (!style) { console.log("Invalid style was passed into setStyle"); return; }
	if (Object.keys(style).length === 0) { return; }

	for (let key in style) { container.style[key] = style[key]; }
}

function setAttributes(container, attributes) {
	//  Ensure we have a proper container, a proper style, and that the attributes passed in isn't empty
	if (!container) { console.log("Invalid container was passed into setStyle"); return; }
	if (!attributes) { console.log("Invalid attributes was passed into setAttributes"); return; }
	if (Object.keys(attributes).length === 0) { return; }

	for (let key in attributes) { container.setAttribute(key, attributes[key]); }
}

function clearChildren(container) {
	while (container.firstChild) { container.removeChild(container.firstChild); }
}