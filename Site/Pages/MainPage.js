class MainPage {
	constructor() {
		//this.setupSoundcloudWidgetAccess();
		this.content = this.GenerateContent();
	}
	
	GenerateContent() {
		let container = new Container({ id: "MainPageContainer", style: { width: "100%", backgroundImage: "linear-gradient(to bottom right, rgb(10, 10, 10), rgb(70, 70, 70))" } });;

		let trackList = [
			"https://soundcloud.com/pauli-niemi/cherry-smile",
			"https://soundcloud.com/pauli-niemi/clouds",
			"https://soundcloud.com/pauli-niemi/warm-thoughts-w-omar",
			"https://soundcloud.com/pauli-niemi/drowning-in-her-eyes",
			"https://soundcloud.com/pauli-niemi/i-was-a-fool-for-you-1",
			"https://soundcloud.com/pauli-niemi/lust-or-love",
			"https://soundcloud.com/user-51502133/ferris-wheel",
			"https://soundcloud.com/rxseboy/im-sad-that-ur-gone",
			"https://soundcloud.com/tsuki_uzu/eyes-on-you",
			"https://soundcloud.com/iam6teen/tranquil",
			"https://soundcloud.com/pauli-niemi/youre-not-real",
			"https://soundcloud.com/musicbysxul/remember-to-remember",
		]
		let soundBar = new SoundBar({ id: "SoundBarTest", trackList: trackList });
		container.appendChild(soundBar.content);

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

		return container.content;
	}
}