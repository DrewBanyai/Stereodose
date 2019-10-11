let makeRequest = async (options, recvJSON = true, sendJSON = true, forceResponse = false) => {
    if (config.MicroserviceRequiresLogin && !LoginToken.isLoggedIn() && !options.endpoint.includes(config.LoginEndpoint)) {
        console.warn("Attempted to send a (non-login) fetch request to the API while not logged in!")
        return null;
    }

    //  Create the headers which will be applied to the fetch call
    let headers = { "Authorization": "Bearer" + localStorage.getItem(config.SiteName + "_accessToken"), };
    if (sendJSON) {
        Object.assign(headers, {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            'Access-Control-Allow-Origin': '*',
            "Authorization": null,//"Bearer" + localStorage.getItem(config.SiteName + "_accessToken"),
        })
    };

    //  Create the full fetch options
    const fetchOptions = {
        method: options.method ? options.method : "POST",
        headers: headers,
        body: options.body ? options.body : null,
    };

    //  Make the fetch call and save off the response
    let response = await fetch(options.endpoint, fetchOptions);
    if (response.ok || forceResponse) { return (recvJSON ? (await response.json()) : (await response)); }
    return null;
}