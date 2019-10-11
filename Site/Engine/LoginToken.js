class LoginToken {
    static removeLoginToken() {
        localStorage.removeItem(config.SiteName + "_accessToken");
        localStorage.removeItem(config.SiteName + "_tokenExpiration");

        let logoutTimeoutID = localStorage.getItem(config.SiteName + "_logoutTimeoutID");
        if (logoutTimeoutID != null) {
            window.clearTimeout(parseInt(logoutTimeoutID));
            localStorage.removeItem(config.SiteName + "_logoutTimeoutID");
        }
    }

    static startTimeoutTimer() {
        let logoutTimeoutID = window.setTimeout(() => { removeLoginToken(); }, config.LogoutTimerMilliseconds);
        localStorage.setItem(config.SiteName + "_logoutTimeoutID", logoutTimeoutID.toString());
        return logoutTimeoutID;
    }

    //  TODO: Set this every time we take a major action on the page
    static resetTimeoutTimer() {
        let logoutTimeoutID = localStorage.getItem(config.SiteName + "_logoutTimeoutID");
        if (logoutTimeoutID != null) {
            window.clearTimeout(parseInt(logoutTimeoutID));
            startTimeoutTimer();
        }
    }

    //  TODO: Check this when we change pages
    static isLoggedIn() {
        let tokenExpiration = new Date(localStorage.getItem(config.SiteName + "_tokenExpiration"));
        return (localStorage.getItem(config.SiteName + "_accessToken") && (Date.now() <= tokenExpiration));
    }
}