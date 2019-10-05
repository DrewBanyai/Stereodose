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

		/*
		widget.bind(SC.Widget.Events.READY, function() {
			console.log("READY");
			toggleButton.SetOnClick(() => { widget.toggle(); })
			widget.bind(SC.Widget.Events.PLAY, function() {
				console.log("PLAY");
				// get information about currently playing sound
				widget.getCurrentSound(function(currentSound) {
					console.log(currentSound);
					console.log('sound ' + currentSound.title + 'began to play');
				});
			});
			// get current level of volume
			widget.getVolume(function(volume) {
				console.log('current volume value is ' + volume);
			});
			// set new volume level
			widget.setVolume(50);
			// get the value of the current position
		});
		*/
		return container;
	}
}