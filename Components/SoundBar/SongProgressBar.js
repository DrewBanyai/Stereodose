class SongProgressBar {
    constructor(options) {
        this.options = options;
        this.progressBar = null;
        this.currentProgress = 0;

        this.colors = {
            mainBarBG: "rgb(180, 180, 180)",
            progressBar: "rgb(230, 230, 230)",
            progressBarHover: "rgb(90, 200, 90)",
            mover: "rgb(255, 255, 255)",
            moverOutline: "rgba(60, 60, 60, 0.3)",
        };
        this.barHeight = "10px";
        this.moverSize = "16px";

        this.content = this.generateContent();

		//  Generic options application
		this.content.id = (options && options.id) ? options.id : "SongProgressBar";
		if (options && options.attributes) { for (let key in options.attributes) { this.content[key] = options.attributes[key] } }
		if (options && options.style) { for (let key in options.style) { this.content.style[key] = options.style[key] } }
    }

    generateContent() {
        let container = document.createElement("div");
        setStyle(container, { borderRadius: "4px", width: "600px", height: this.barHeight, backgroundColor: this.colors.mainBarBG, position: "relative" });
        container.onmouseover = () => { this.setHighlightOn(true); }
        container.onmouseout = () => { this.setHighlightOn(false); }
        container.onclick = (e) => {
            let newProgress = (e.layerX / e.target.offsetWidth * 100).toFixed(3);
            this.setProgress(newProgress, true);
        }

        this.progressBar = document.createElement("div");
        this.progressBar.id = "SongProgress";
        setStyle(this.progressBar, { borderRadius: "4px", width: "0px", height: this.barHeight, backgroundColor: this.colors.progressBar, position: "relative", pointerEvents: "none", });
        container.appendChild(this.progressBar);

        this.progressBarMover = document.createElement("div");
        this.progressBarMover.id = "SongProgressMover";
        setStyle(this.progressBarMover, { position: "absolute", visibility: "hidden", pointerEvents: "none", left: `${-(parseInt(this.moverSize) / 2)}px`, top: `${(-parseInt(this.moverSize) / 4)}px` });

        let mover = document.createElement("div");
        setStyle(mover, { borderRadius: "50%", width: this.moverSize, height: this.moverSize, position: "relative", backgroundColor: this.colors.mover, border: `1px solid ${this.colors.moverOutline}` });
        this.progressBarMover.appendChild(mover);
        container.appendChild(this.progressBarMover);

        return container;
    }

    setHighlightOn(highlightOn) {
        let barWidth = (this.content.offsetWidth * this.currentProgress / 100).toFixed(3);
        setStyle(this.progressBar, { backgroundColor: (highlightOn ? this.colors.progressBarHover : this.colors.progressBar) })
        setStyle(this.progressBarMover, { visibility: (highlightOn ? "visible" : "hidden"), left: `${barWidth - (parseInt(this.moverSize) / 2)}px` });
    }

    setProgress(percent, triggerCallback = false) { 
        this.currentProgress = percent;
        let barWidth = (this.content.offsetWidth * this.currentProgress / 100).toFixed(3);
        setStyle(this.progressBar, { width:  `${barWidth}px` });
        setStyle(this.progressBarMover, { left: `${barWidth - (parseInt(this.moverSize) / 2)}px`, top: `${(-parseInt(this.moverSize) / 4)}px` });
        if (triggerCallback && this.options.progressCallback) { this.options.progressCallback(this.currentProgress); }
    }
}