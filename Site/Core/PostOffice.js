class PostOffice {
    ////////////////////////////////////////
    //////////    TEST ROUTES     //////////
    ////////////////////////////////////////

    static async GetTestPlaylist() {
        return PostOffice.PlaylistDetails("5da159d6a4558e3fd45dac1f");
    }


    ////////////////////////////////////////
    //////////    USER ROUTES     //////////
    ////////////////////////////////////////
    
    static async UserRegister(username, password) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "user/register",
            body: JSON.stringify({ Username: username, Password: password, }) 
        });
    }

    static async UserLogin(username, password) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "user/login",
            body: JSON.stringify({ Username: username, Password: password, }) 
        });
    }

    static async UserDelete(username, password) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "user/delete",
            body: JSON.stringify({ Username: username, Password: password, }) 
        });
    }

    static async UserGetFavorites(username, password) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "user/getFavorites",
            body: JSON.stringify({ Username: username, Password: password, }),
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
            }),
        });
    }

    static async PlaylistDelete(playlistID) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "playlist/delete",
            body: JSON.stringify({ PlaylistID: playlistID, }),
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
        });
    }

    static async GetAllUsers(adminPasscode) {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "admin/getAllUsers",
            body: JSON.stringify({ AdminPasscode: adminPasscode, }),
        });
    }
}