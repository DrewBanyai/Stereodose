let authToken = "";

class PostOffice {
    ////////////////////////////////////////
    //////////    USER ROUTES     //////////
    ////////////////////////////////////////
    
    static async UserRegister(username, password) {
        let result = await makeRequest({
            endpoint: config.MicroserviceURL + "user/register",
            body: JSON.stringify({ Username: username, Password: password, }) 
        });
        if (result && result.success) { authToken = result.token; }
        return result;

    }

    static async UserLogin(username, password) {
        let result = await makeRequest({
            endpoint: config.MicroserviceURL + "user/login",
            body: JSON.stringify({ Username: username, Password: password, }) 
        });
        if (result && result.success) { authToken = result.token; }
        return result;
    }

    static async UserDelete(username, password) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "user/delete",
            body: JSON.stringify({ Username: username, Password: password, token: authToken }) 
        });
    }

    static async UserGetFavorites(username, password) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "user/getFavorites",
            body: JSON.stringify({ Username: username, Password: password, token: authToken }),
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
                ImageSrc: imageSrc,
                TrackList: trackList,
                token: authToken,
            }),
        });
    }

    static async PlaylistDelete(playlistID) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "playlist/delete",
            body: JSON.stringify({ PlaylistID: playlistID, }),
            token: authToken,
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
                token: authToken,
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
            token: authToken,
        });
    }

    static async GetAllUsers(adminPasscode) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "admin/getAllUsers",
            body: JSON.stringify({ AdminPasscode: adminPasscode, }),
            token: authToken,
        });
    }
}