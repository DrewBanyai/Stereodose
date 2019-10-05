let player = null;

class MainPage {
	constructor() {
		//this.setupSoundcloudWidgetAccess();
		this.content = this.GenerateContent();
	}
	
	GenerateContent() {
		let container = document.createElement("div");
		container.id = "MainPageContainer";
		container.style.width = "100%";
		container.style.backgroundImage = "linear-gradient(to bottom right, rgb(10, 10, 10), rgb(70, 70, 70))";

		SC.initialize({ client_id: "dV0jpQ1RaaPeGmiJcmR05K9OPzSaUAZJ", /*redirect_uri: "CALLBACK_URL"*/ });
		
		SC.get("/tracks", function(response) {
			console.log("Loaded track list:");
			console.log(response);
			//for (var i = 0; i < response.length; i++) {
			//  $("ul").append("<li>" + response[i].title + "</li>");
			//}
		});
		
		let toggleButton = new PrimaryButton({
			id: "ToggleButton",
			attributes: { value: "toggle", },
			style: {
				fontFamily: "Arial",
				fontSize: "12px",
				width: "160px",
			}
		});
		container.appendChild(toggleButton.content);

		toggleButton.SetOnClick(async () => {
			console.log("Attempting to play Cherry Smile");
			let resource = await SC.resolve("https://soundcloud.com/pauli-niemi/cherry-smile");
			if (!resource) { console.log("Failed to load resource!"); return; }
			console.log(resource);

			if (!player) { player = await SC.stream(`/tracks/${resource.id}`); }
			if (!player) { console.log("Failed to load player!"); return; }
			if (player.isPlaying()) { player.pause(); } else { player.play(); }
		});

		return container;
	}
}