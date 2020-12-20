// Facebook command - Downloads Facebook video
const wa = require('@open-wa/wa-automate');

const sendConvertedMP3 = require('../utils/sendConvertedMP3');
const getVideoInfo = require('../utils/getVideoInfo');
const sendConvertedMP4 = require('../utils/sendConvertedMP4');
const { getVideoDurationInSeconds } = require('get-video-duration');
const messages = require('../data/messages');


module.exports = Facebook = async (client, message, arguments) => {
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

        if(obj_["argument"] === "audio"){
            audio_url = true
        }
    }
    const info = await getVideoInfo(url);
    console.log(info)

    if(Object.keys(info).length === 0){
        await client.sendText(message.from, messages.YOUTUBE_PRIVATE);      
    }  
    else if(audio_url === false){
        await getVideoDurationInSeconds(info.formats[0].url).then((duration) => {
            video_duration = duration;
        });

        if(video_duration <= max_audio_duration){
            
            if(info.formats[0].format.includes("DASH")){

                await client.sendText(message.from, messages.YOUTUBE_FOUND('Audio', info.title));
                await sendConvertedMP3(info.formats[0].url, client, message.from, `${info.title}.mp3`)

                
            }else{

                await client.sendText(message.from, messages.YOUTUBE_FOUND('Audio', info.title));
                await sendConvertedMP3(info.formats[0].url, client, message.from, `${info.title}.mp3`)

            }
        }
        else{
            await client.sendText(message.from, messages.MAX_LIMIT('audio', max_audio_duration / 60));
        }
        
    }
    


}