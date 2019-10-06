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

		let soundcloudPlayer = new SoundcloudPlayer({
			soundcloudLinkList: [
				"https://soundcloud.com/pauli-niemi/cherry-smile",
			],
		});
		container.appendChild(soundcloudPlayer.content);

		return container;
	}
}