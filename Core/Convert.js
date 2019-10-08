class Convert {
    static NumberToTwoDigits(number) { return ("0" + number).slice(-2); }

    static SecondsToMinutesAndSeconds(seconds) {
        seconds = Math.floor(seconds / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        let hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
        return (hours > 0) ? `${hours}:${Convert.NumberToTwoDigits(minutes)}:${Convert.NumberToTwoDigits(seconds)}` : `${minutes}:${Convert.NumberToTwoDigits(seconds)}`;
    }
}