const convertM4AUrlToMP3DataUrl = require('../ffmpeg_converters/convertM4AUrlToMP3DataUrl');
const messages = require('../../data/messages');
const constants = require('../../data/constants');

module.exports = sendConvertedMP3 = async function ( url , client, from, name)  {

    let timeout_min = 8;
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
        const tree = new Promise((resolve, reject) => {
            resolve(client.sendFile(from, d, name));
        });

        const timed = new Promise((resolve, reject) => {
            setTimeout(resolve, timeout_ms, messages.TIMEOUT_SENDING('audio'));
        });

        let f = await Promise.race([timed, tree]).then((value) => {
            return value;
        });

        if(f != true){
            await client.sendText(from, f);
        }
        else{
             ++constants.audio_counter
        }

    }
    
}