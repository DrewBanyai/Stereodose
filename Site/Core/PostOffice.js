let authData = { user: null, token: null, expires: null, next: null };

//  Keep a list of all objects which listen for changes in authentication
let authListeners = [];

class PostOffice {
    static isAuthenticationValid(data) {
        if (!data || !data.user || !data.token || !data.expires || !data.next) { return false; }
        let now = (new Date()).toISOString();
        if (now > data.expires) { console.log("EXPIRES"); return false; }
        //if (now > data.next) { console.log("NEXT"); return false; }
        return true;
    }

    static async getAuthentication() {
        if (this.isAuthenticationValid(authData)) { return authData; }

        //  If the current authentication isn't valid, attempt to grab it from local storage
        let storedData = JSON.parse(localStorage.getItem(config.SiteName + "_AuthData"));
        for (let key in storedData) { if (storedData[key] === "null") { storedData[key] = null; } }
        if (this.isAuthenticationValid(storedData)) { this.setAuthentication(storedData); return authData; }

        return null;
    }

    static nullAuthentication() { this.setAuthentication({ user: null, token: null, expires: null, next: null }); }

    static setAuthentication(data) {
        authData = data;
        localStorage.setItem(config.SiteName + "_AuthData", JSON.stringify(data));

        this.cleanAuthListeners();
        //console.log("Auth Listeners:", authListeners);
        for (let i = 0; i < authListeners.length; ++i) { authListeners[i].authUpdate(data); }

        return authData;
    }

    static cleanAuthListeners() { authListeners = authListeners.filter((entry) => { return (entry && entry.authUpdate && entry.content.parentNode); });}

    static addAuthListener(listener) {
        if (!listener || authListeners.includes(listener)) { return; }
        authListeners.push(listener);
    }

    static removeAuthListener(listener) {
        if (!listener || !authListeners.includes(listener)) { return; }
        authListeners.removeChild(listener);
    }

    ////////////////////////////////////////
    //////////    USER ROUTES     //////////
    ////////////////////////////////////////
    
    static async UserRegister(username, password) {
        try {
            let result = await makeRequest({ endpoint: config.MicroserviceURL + "user/register", body: JSON.stringify({ Username: username, Password: password, }) });
            if (result && result.success) {
                let expires = new Date();
                expires.setDate(expires.getDate() + 1);
                expires = expires.toISOString();

                let next = new Date();
                next.setHours(next.getHours() + 1);
                next = next.toISOString();

                PostOffice.setAuthentication({ user: result.user, token: result.token, expires: expires, next: next });
            }

            return result;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async UserLogin(username, password) {
        try {
            let result = await makeRequest({ endpoint: config.MicroserviceURL + "user/login", body: JSON.stringify({ Username: username, Password: password, }), });
            if (result && result.success) {
                let expires = new Date();
                expires.setDate(expires.getDate() + 1);
                expires = expires.toISOString();

                let next = new Date();
                next.setHours(next.getHours() + 1);
                next = next.toISOString();

                PostOffice.setAuthentication({ user: result.user, token: result.token, expires: expires, next: next });
            }

            return result;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async UserDelete(username, password) {
        try {
            let result = await makeRequest({ endpoint: config.MicroserviceURL + "user/delete", body: JSON.stringify({ Username: username, Password: password, token: authData.token }), });
            if (result && result.success) { return true; }
            if (result) { console.warn("User - Delete:", result.message); }
            return false;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async UserGetFavorites(username) {
        try {
            let result = await makeRequest({ endpoint: config.MicroserviceURL + "user/getFavorites", body: JSON.stringify({ Username: username, token: authData.token }), });
            if (result && result.success) { return true; }
            if (result) { console.warn("User - Get Favorites:", result.message); }
            return false;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }


    ////////////////////////////////////////
    //////////  PLAYLIST ROUTES   //////////
    ////////////////////////////////////////

    static async PlaylistCreate(name, desc, imageSrc, trackList, hidden) {
        try {
            let result = await makeRequest({
                endpoint: config.MicroserviceURL + "playlist/create",
                body: JSON.stringify({ Creator: authData.user.username, Name: name, Description: desc, ImageSource: imageSrc, TrackList: trackList, Hidden: hidden, token: authData.token, }),
            });
            if (result && result.success) { return result.playlist; }
            if (result) { console.warn("Playlist - Create:", result.message); }
            return null;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async PlaylistListMine() {
        try {
            let result = await makeRequest({ endpoint: config.MicroserviceURL + "playlist/listMine", body: JSON.stringify({ Creator: authData.user.username, token: authData.token, }), });
            if (result && result.success) { return result.playlists; }
            if (result) { console.warn("Playlist - List Mine: ", result.message); }
            return null;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async PlaylistListFavorites() {
        try {
            let result = await makeRequest({ endpoint: config.MicroserviceURL + "playlist/listFavorites", body: JSON.stringify({ Creator: authData.user.username, token: authData.token, }), });
            if (result && result.success) { return result.favorites; }
            if (result) { console.warn("Playlist - List Favorites: ", result.message); }
            return null;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async PlaylistDelete(playlistID) {
        try {
            let result = await makeRequest({
                endpoint: config.MicroserviceURL + "playlist/delete",
                body: JSON.stringify({ PlaylistID: playlistID, }),
                token: authData.token,
            });
        
            if (result && result.success) { return true; }
            if (result) { console.warn("Playlist - Delete: ", result.message); }
            return false;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async PlaylistExists(playlistName) {
        try {
            return await makeRequest({
                endpoint: config.MicroserviceURL + "playlist/exists",
                body: JSON.stringify({ Name: playlistName, }),
                token: authData.token,
            });
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async PlaylistDetails(playlistID) {
        try {
            return await makeRequest({
                endpoint: config.MicroserviceURL + "playlist/details",
                body: JSON.stringify({ PlaylistID: playlistID, }),
            });
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async PlaylistFavorite(playlistID, favorite) {
        if (!this.getAuthentication()) { console.warn("Authorization expired"); return null; }

        try {
            let result = await makeRequest({
                endpoint: config.MicroserviceURL + "playlist/favorite",
                body: JSON.stringify({ Username: authData.user.username, PlaylistID: playlistID, Favorite: favorite, token: authData.token, }),
            });


            if (result && result.success) {
                if (result.user) { authData.user = result.user; }
                this.setAuthentication(authData);
                return true;
            }
            if (result) { console.warn("Playlist - Favorite: ", result.message); }
            return false;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async PlaylistSetHidden(playlistID, hidden) {
        if (!this.getAuthentication()) { console.warn("Authorization expired"); return null; }

        try {
            let result = await makeRequest({
                endpoint: config.MicroserviceURL + "playlist/setHidden",
                body: JSON.stringify({ Username: authData.user.username, PlaylistID: playlistID, Hidden: hidden, token: authData.token, }),
            });

            if (result && result.success) { return true; }
            if (result) { console.warn("Playlist - Set Hidden: ", result.message); }
            return false;
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async PlaylistRandomGroup() {
        try {
            return await makeRequest({
                endpoint: config.MicroserviceURL + "playlist/randomGroup",
                body: JSON.stringify({ Username: ((authData && authData.user) ? authData.user.username : ""), token: (authData ? authData.token : "") }),
            });
        }
        catch (error) { console.warn(error); console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }


    ////////////////////////////////////////
    //////////   ADMIN ROUTES     //////////
    ////////////////////////////////////////

    static async GetAllPlaylists(adminPasscode) {
        try {
            return await makeRequest({
                endpoint: config.MicroserviceURL + "admin/getAllPlaylists",
                body: JSON.stringify({ AdminPasscode: adminPasscode, }),
                token: authData.token,
            });
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }

    static async GetAllUsers(adminPasscode) {
        try {
            return await makeRequest({
                endpoint: config.MicroserviceURL + "admin/getAllUsers",
                body: JSON.stringify({ AdminPasscode: adminPasscode, }),
                token: authData.token,
            });
        }
        catch (error) { console.warn("Failed to contact the server. Please try again later or contact the administrator."); return null; }
    }
}