class PostOffice {
    static async GetTestPlaylist() { return await makeRequest({ endpoint: config.MicroserviceURL + "playlist/details", body: JSON.stringify({}) }); }
}