let authData = { username: null, token: null, expires: null };

class PostOffice {
    static getAuthorization() {
        if (authData.username && authData.token && authData.expires) { return authData; }
        authData = {
            username: localStorage.getItem(config.SiteName + "_Username"),
            token: localStorage.getItem(config.SiteName + "_AutoToken"),
            expires: localStorage.getItem(config.SiteName + "_AuthExpires"),
        };
        for (let key in authData) { if (authData[key] === "null") { authData[key] = null; } }
        let now = new Date();
        if (!authData.expires || (now > authData.expires)) { authData = this.setAuthorization(null, null, null); }
        return authData;
    }

    static setAuthorization(username, token, expires) {
        localStorage.setItem(config.SiteName + "_Username", username);
        localStorage.setItem(config.SiteName + "_AutoToken", token);
        localStorage.setItem(config.SiteName + "_AuthExpires", expires);
        authData = { username: username, token: token, expires: expires };
        return authData;
    }

    ////////////////////////////////////////
    //////////    USER ROUTES     //////////
    ////////////////////////////////////////
    
    static async UserRegister(username, password) {
        let result = await makeRequest({
            endpoint: config.MicroserviceURL + "user/register",
            body: JSON.stringify({ Username: username, Password: password, }) 
        });
        if (result && result.success) { let expires = new Date(); expires.setDate(expires.getDate() + 1); PostOffice.setAuthorization(username, result.token, expires); }
        return result;

    }

    static async UserLogin(username, password) {
        let result = await makeRequest({
            endpoint: config.MicroserviceURL + "user/login",
            body: JSON.stringify({ Username: username, Password: password, }) 
        });
        if (result && result.success) { let expires = new Date(); expires.setDate(expires.getDate() + 1); PostOffice.setAuthorization(username, result.token, expires); }
        return result;
    }

    static async UserDelete(username, password) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "user/delete",
            body: JSON.stringify({ Username: username, Password: password, token: authData.token }) 
        });
    }

    static async UserGetFavorites(username, password) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "user/getFavorites",
            body: JSON.stringify({ Username: username, Password: password, token: authData.token }),
        });
    }


    ////////////////////////////////////////
    //////////  PLAYLIST ROUTES   //////////
    ////////////////////////////////////////

    static async PlaylistCreate(name, desc, imageSrc, trackList) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "playlist/create",
            body: JSON.stringify({
                Creator: authData.username,
                Name: name,
                Description: desc,
                ImageSource: imageSrc,
                TrackList: trackList,
                token: authData.token,
            }),
        });
    }

    static async PlaylistListMine() {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "playlist/listMine",
            body: JSON.stringify({
                Creator: authData.username,
                token: authData.token,
            }),
        });
    }

    static async PlaylistDelete(playlistID) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "playlist/delete",
            body: JSON.stringify({ PlaylistID: playlistID, }),
            token: authData.token,
        });
    }

    static async PlaylistExists(playlistName) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "playlist/exists",
            body: JSON.stringify({ Name: playlistName, }),
            token: authData.token,
        });
    }

    static async PlaylistDetails(playlistID) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "playlist/details",
            body: JSON.stringify({ PlaylistID: playlistID, }),
        });
    }

    static async PlaylistFavorite(username, password, playlistID) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "playlist/details",
            body: JSON.stringify({
                Username: username,
                Password: password,
                PlaylistID: playlistID,
                token: authData.token,
            }),
        });
    }

    static async PlaylistRandomGroup() {
        return await makeRequest({ endpoint: config.MicroserviceURL + "playlist/randomGroup", });
    }


    ////////////////////////////////////////
    //////////   ADMIN ROUTES     //////////
    ////////////////////////////////////////

    static async GetAllPlaylists(adminPasscode) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "admin/getAllPlaylists",
            body: JSON.stringify({ AdminPasscode: adminPasscode, }),
            token: authData.token,
        });
    }

    static async GetAllUsers(adminPasscode) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "admin/getAllUsers",
            body: JSON.stringify({ AdminPasscode: adminPasscode, }),
            token: authData.token,
        });
    }
}