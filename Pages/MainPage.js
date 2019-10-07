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
				"https://soundcloud.com/pauli-niemi/clouds",
			],
		});
		container.appendChild(soundcloudPlayer.content);

		let songURLInput = new TextInput({
			id: "SongURLInput",
			style: {
				width: "300px",
				height: "20px",
				fontFamily: "Arial",
				fontSize: "12px",
				lineHeight: "32px",
				color: "black",
				backgroundColor: "white",
				display: "inline-block",
			}
		});
		container.appendChild(songURLInput.content);

		let songSubmitButton = new PrimaryButton({
			id: "SongSubmitButton",
			attributes: {
				value: "Submit",
			},
			style: {
				width: "60px",
				height: "20px",
				display: "inline-block",
				margin: "5px 0px 0px 0px",
				fontSize: "12px",
				fontWeight: "500",
			}
		});
		songSubmitButton.SetOnClick(() => {
			soundcloudPlayer.addSoundcloudLink(songURLInput.content.value);
			songURLInput.setValue("");
		});
		container.appendChild(songSubmitButton.content);

		return container;
	}
}