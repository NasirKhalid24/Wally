const convertM4AUrlToMP3DataUrl = require('../utils/convertM4AUrlToMP3DataUrl');
const messages = require('../data/messages');

module.exports = sendConvertedMP3 = async function ( url , client, from, name)  {

    let timeout_min = 5;
    let timeout_ms = timeout_min * 60000;

    const timer = new Promise((resolve, reject) => {
        setTimeout(resolve, timeout_ms, messages.TIMEOUT_SENDING('audio'));
    });

    const download = new Promise((resolve, reject) => {
        resolve(convertM4AUrlToMP3DataUrl(url))
    });

    let d = await Promise.race([timer, download]).then((value) => {
        return value;
    });

    if(d == messages.TIMEOUT_SENDING('audio')){
        client.sendText(from, d);
    }else{
        await client.sendFile(from, d, name);
    }
    
}