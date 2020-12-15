const axios = require('axios');

module.exports = getDUrl = async function (url){
    try {
        const res = await axios({
            method:"get",
            url,
            headers: {
            'DNT':1,
            'Upgrade-Insecure-Requests':1
            },
            onDownloadProgress: function (progressEvent) {
                console.log("Download = ", progressEvent.loaded, " / ", progressEvent.total);
            },
            onUploadProgress: function (progressEvent) {
                console.log("Upload = ", progressEvent.loaded, " / ", progressEvent.total);
            },
            responseType: 'arraybuffer'
        });
        const dUrl = `data:${res.headers['content-type']};base64,${Buffer.from(res.data, 'binary').toString('base64')}`;
        return dUrl;
    } catch (error) {
        console.log("TCL: getDUrl -> error", error)
    }
}
