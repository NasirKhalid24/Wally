const dURL = require("./dURL");

module.exports = sendConvertedMP4 = async function ( url , client, from, name)  {

    let timeout_min = 5
    let timeout_ms = timeout_min * 60000;

    const timer = new Promise((resolve, reject) => {
        setTimeout(resolve, timeout_ms, 'Timeout while sending video - ensure video is within size limits of Whatsapp chat');
    });

    const download = new Promise((resolve, reject) => {
        resolve(dURL(url))
    });

    let d = await Promise.race([timer, download]).then((value) => {
        return value;
    });

    if(d == 'Timeout while sending video - ensure video is within size limits of Whatsapp chat'){
        client.sendText(from, d);
    }else{
        await client.sendFile(from, d, name);
    }
    
}