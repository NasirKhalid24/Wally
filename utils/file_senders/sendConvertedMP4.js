const dURL = require("../data_downloaders/dURL");
const messages = require('../../data/messages');
const constants = require('../../data/constants');

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
        await client.sendText(from, d);
    }else{

        const tree = new Promise((resolve, reject) => {
            resolve(client.sendFile(from, d, name));
        });

        const timed = new Promise((resolve, reject) => {
            setTimeout(resolve, timeout_ms, messages.TIMEOUT_SENDING('video'));
        });

        let f = await Promise.race([timed, tree]).then((value) => {
            return value;
        });

        if(f != true){
            await client.sendText(from, f);
        }
        else{
            ++constants.video_counter
        }
       
    }
    
}