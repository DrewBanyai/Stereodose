let isURL = (string) => { return /((\/\w+)|(^\w+))\.\w{2,}$/.test(string); };

let loadImageToBase64 = async (imageURL) => {
    if (!isURL(imageURL)) { return null; }
    try {
        let result = await fetch(imageURL);
        var imageBlob = await result.blob();

        return new Promise((resolve, reject) => {
            let reader  = new FileReader();
            reader.addEventListener("load", function () { resolve(reader.result); }, false);
            reader.onerror = (e) => { console.log("Image Load Error:", e); return reject(this); };
            reader.readAsDataURL(imageBlob);
        });
    } catch (error) { return null; }
};