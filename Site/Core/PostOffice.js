class PostOffice {
    static async GetTestPlaylist() {
        return await makeRequest({
            endpoint: config.MicroserviceURL + "playlist/details",
            body: JSON.stringify({  PlaylistID: "5da159d6a4558e3fd45dac1f", })
        });
    }
}