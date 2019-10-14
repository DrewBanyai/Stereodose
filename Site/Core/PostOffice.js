let authData = { username: null, token: null, expires: null };

class PostOffice {
    static getAuthorization() {
        if (authData.username && authData.token && authData.expires) { return authData; }
        authData = {
            username: localStorage.getItem(config.SiteName + "_Username"),
            token: localStorage.getItem(config.SiteName + "_AutoToken"),
            expires: localStorage.getItem(config.SiteName + "_AuthExpires"),
        };
        return authData;
    }

    static setAuthorization(username, token, expires) {
        localStorage.setItem(config.SiteName + "_Username", username);
        localStorage.setItem(config.SiteName + "_AutoToken", token);
        localStorage.setItem(config.SiteName + "_AuthExpires", expires);
        authData = { username: username, token: token, expires: expires };
    }

    ////////////////////////////////////////
    //////////    USER ROUTES     //////////
    ////////////////////////////////////////
    
    static async UserRegister(username, password) {
        let result = await makeRequest({
            endpoint: config.MicroserviceURL + "user/register",
            body: JSON.stringify({ Username: username, Password: password, }) 
        });
        if (result && result.success) { PostOffice.setAuthorization(username, result.token, (new Date()) + 1); }
        return result;

    }

    static async UserLogin(username, password) {
        let result = await makeRequest({
            endpoint: config.MicroserviceURL + "user/login",
            body: JSON.stringify({ Username: username, Password: password, }) 
        });
        if (result && result.success) { PostOffice.setAuthorization(username, result.token, (new Date()) + 1); }
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
                Name: name,
                Description: desc,
                ImageSource: imageSrc,
                TrackList: trackList,
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