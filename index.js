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