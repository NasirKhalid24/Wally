const dURL = require("./dURL");
const messages = require('../data/messages');

module.exports = sendConvertedMP4 = async function ( url , client, from, name)  {

    let timeout_min = 5
    let timeout_ms = timeout_min * 60000;

    const timer = new Promise((resolve, reject) => {
        setTimeout(resolve, timeout_ms, messages.TIMEOUT_SENDING('video'));
    });

    const download = new Promise((resolve, reject) => {
        resolve(dURL(url))
    });

    let d = await Promise.race([timer, download]).then((value) => {
        return value;
    });

    if(d == messages.TIMEOUT_SENDING('video')){
        console.log('video send failed')
        await client.sendText(from, d);
    }else{
        console.log('video send successly')
        await client.sendFile(from, d, name);
    }
    
}