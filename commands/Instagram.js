const wa = require('@open-wa/wa-automate');

const sendConvertedMP3 = require('../utils/sendConvertedMP3');
const getVideoInfo = require('../utils/getVideoInfo');
const sendConvertedMP4 = require('../utils/sendConvertedMP4');
const messages = require('../data/messages');
const { getVideoDurationInSeconds } = require('get-video-duration')


module.exports = Instagram = async (client, message, arguments) => {
    let url = "";
    let audio_url = false;
    let max_audio_duration = 600; // 10 mins
    let max_video_duration = 600; // 10 mins
    var video_duration;

    for (let index = 0; index < arguments.length; index++) {
        const obj_ = arguments[index];
        
        if(obj_["argument"] === "url"){
            url = obj_["value"];
        }
    }
    const info = await getVideoInfo(url);
    console.log(info)

    if(Object.keys(info).length === 0){
        await client.sendText(message.from, messages.INVALID_INSTA);      
    }
    else{
        try{
            var position = info.formats.findIndex(x => x.format_id == '0')
            await getVideoDurationInSeconds(info.formats[position].url).then((duration) => {
                video_duration = duration;
            });
            console.log(video_duration)
              if (video_duration <= max_video_duration){
                await client.sendText(message.from, messages.YOUTUBE_FOUND('Video', info.description));
                await sendConvertedMP4(info.formats[position].url, client, message.from,  `video.mp4`);
              }
              else{
                await client.sendText(message.from,'video too long');
              }
        }
        catch(error){
            await client.sendText(message.from,'video invalid for some reason, contact adib')
        }
    }
}