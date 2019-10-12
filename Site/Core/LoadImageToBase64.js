let loadImageToBase64 = async (imageUrl) => {
    let result = await fetch(imageUrl);
    var imageBlob = await result.blob();

    return new Promise((resolve, reject) => {
        let reader  = new FileReader();
        reader.addEventListener("load", function () { resolve(reader.result); }, false);
        reader.onerror = () => { return reject(this); };
        reader.readAsDataURL(imageBlob);
    });
}