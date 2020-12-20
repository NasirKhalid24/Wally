// Youtube command - Downloads youtube video
const wa = require('@open-wa/wa-automate');

const sendConvertedMP3 = require('../utils/sendConvertedMP3');
const getVideoInfo = require('../utils/getVideoInfo');
const sendConvertedMP4 = require('../utils/sendConvertedMP4');
const messages = require('../data/messages');


module.exports = Twitter = async (client, message, arguments) => {
    let url = "";
    let audio_url = false;
    let max_audio_duration = 600; // 10 mins
    let max_video_duration = 600; // 10 mins

    for (let index = 0; index < arguments.length; index++) {
        const obj_ = arguments[index];
        
        if(obj_["argument"] === "url"){
            url = obj_["value"];
        }
    }
    const info = await getVideoInfo(url);

    //http-832

    
    if(Object.keys(info).length === 0){
        await client.sendText(message.from, messages.INVALID_TWEET);      
    }
    else{
        if(info._duration_raw <= max_video_duration){
            var position = info.formats.findIndex(x => x.format_id == 'http-832')
            await client.sendText(message.from, messages.YOUTUBE_FOUND('Video', info.title));
            await sendConvertedMP4(info.formats[position].url, client, message.from,  `${info.title}.mp4`);
    
        }
        else{
            await client.sendText(message.from, messages.MAX_LIMIT('video', max_video_duration / 60));
        }
    }
}