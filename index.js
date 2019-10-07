let MainContent = null;

let SiteName = "Stereodose Redux";
let SiteWidth = "920px";

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
}

function setStyle(container, style) {
	//  Ensure we have a proper container, a proper style, and that the style passed in isn't empty
	if (!container) { console.log("Invalid container was passed into setStyle"); return; }
	if (!style) { console.log("Invalid style was passed into setStyle"); return; }
	if (Object.keys(style).length === 0) { return; }

	for (let key in style) { container.style[key] = style[key]; }
}