let isURL = (string) => { return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(string); };

let isURLUnitTest = () => {
    console.log("isURL Unit Test (should result in 2 true, 4 false)");

    console.log(isURL("https://i1.sndcdn.com/artworks-000635252983-ialzvz-t500x500.jpg"));
    console.log(isURL("https://i.imgur.com/3rJYYEB.jpg"));

    console.log(isURL("https://i1.sndcdn.com/artworks-000635252983-ialzvz-t500x500"));
    console.log(isURL("https://i1.sndcdn.com"));
    console.log(isURL("https://i.imgur.com/3rJYYEB"));
    console.log(isURL("https://i.imgur.com/"));
}

let loadImageToBase64 = async (imageURL) => {
    if (!isURL(imageURL)) { console.log(`${imageURL} is not a valid URL`); return null; }
    try {
        let result = await fetch(imageURL, { method: "GET", mode: "no-cors" });
        var imageBlob = await result.blob();

        return new Promise((resolve, reject) => {
            let reader  = new FileReader();
            reader.addEventListener("load", function () { resolve(reader.result); }, false);
            reader.onerror = (e) => { console.log("Image Load Error:", e); return reject(this); };
            reader.readAsDataURL(imageBlob);
        });
    } catch (error) { return null; }
};