class ViewPlaylist {
	constructor(options) {
		this.options = options;
		this.content = this.GenerateContent();
	}
	
	GenerateContent() {
		let container = new Container({ id: "ViewPlaylistContainer", style: { width: "920px", height: "100%", margin: "auto", textAlign: "left", } });

		return container.content;
	}
}