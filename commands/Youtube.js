// Youtube command - Downloads youtube video
const wa = require('@open-wa/wa-automate');

const sendConvertedMP3 = require('../utils/sendConvertedMP3');
const getVideoInfo = require('../utils/getVideoInfo');
const sendConvertedMP4 = require('../utils/sendConvertedMP4');
const messages = require('../data/messages');


module.exports = Youtube = async (client, message, arguments) => {
    
    let url = "";
    let audio_url = false;
    let max_audio_duration = 600; // 10 mins
    let max_video_duration = 600; // 10 mins

    for (let index = 0; index < arguments.length; index++) {
        const obj_ = arguments[index];

        if(obj_["argument"] === "url"){
            url = obj_["value"];
        }

        if(obj_["argument"] === "audio"){
            audio_url = true
        }
    }

    // Get Info
    const info = await getVideoInfo(url);
    
    // If video private, undefined or url does not exist then info will be empty
    if(Object.keys(info).length === 0){
        await client.sendText(message.from, messages.YOUTUBE_PRIVATE);      
    }   

    // If user requests audio only
    else if(audio_url === true){

        if(info._duration_raw <= max_audio_duration){

            var audio_position = info.formats.findIndex(x => x.format_id == '140')
            await client.sendText(message.from, messages.YOUTUBE_FOUND('Audio', info.title));
            await sendConvertedMP3(info.formats[audio_position].url, client, message.from, `${info.title}.mp3`)

        }
        else{
            await client.sendText(message.from, messages.MAX_LIMIT('audio', max_audio_duration / 60));
        }

    } 

    // If user wants video
    else{
        
        // If video is less than max length
        if(info._duration_raw <= max_video_duration){

            var position_240p = info.formats.findIndex(x => x.format_id == '18')
            await client.sendText(message.from, messages.YOUTUBE_FOUND('Video', info.title));
            await sendConvertedMP4(info.formats[position_240p].url, client, message.from,  `${info.title}.mp4`);
            
        }
        else{
            await client.sendText(message.from, messages.MAX_LIMIT('video', max_video_duration / 60));
        }

    }


}