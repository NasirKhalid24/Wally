// Youtube command - Downloads youtube video
const wa = require('@open-wa/wa-automate');

const sendConvertedMP3 = require('../utils/file_senders/sendConvertedMP3');
const getVideoInfo = require('../utils/data_downloaders/getVideoInfo');
const sendConvertedMP4 = require('../utils/file_senders/sendConvertedMP4');
const messages = require('../data/messages');
const constants = require('../data/constants');


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
            
            if(info.formats[audio_position].format.includes("DASH")){
                try{
                await client.sendText(message.from, messages.INFO_FOUND('Audio', info.title));
                await sendConvertedMP3(info.formats[audio_position].fragment_base_url, client, message.from, `${info.title}.mp3`)
                ++constants.youtube_audio_counter
                }
                catch(error){
                    client.sendText(message.from, messages.UNKNOWN_ERROR('Youtube Audio'))
                    ++constants.youtube_audio_errors
                    console.log(`
                    Error when trying to process Youtube to MP3
                    From: ${message.from}
                    Error: ${error}
                    `)
                    }
                }

            else{
                try{
                await client.sendText(message.from, messages.INFO_FOUND('Audio', info.title));
                await sendConvertedMP3(info.formats[audio_position].url, client, message.from, `${info.title}.mp3`)
                ++constants.youtube_audio_counter
                }
                catch(error){
                    client.sendText(message.from, messages.UNKNOWN_ERROR('Youtube Audio'))
                    ++constants.youtube_audio_errors
                    console.log(`
                    Error when trying to process Youtube to MP3
                    From: ${message.from}
                    Error: ${error}
                    `)
                    }
                }
    
        }
        else{
            await client.sendText(message.from, messages.MAX_LIMIT('audio', max_audio_duration / 60));
        }

    } 

    // If user wants video
    else{
        
        // If video is less than max length
        if(info._duration_raw <= max_video_duration){
            try{
            var position_240p = info.formats.findIndex(x => x.format_id == '18')
            await client.sendText(message.from, messages.INFO_FOUND('Video', info.title));
            await sendConvertedMP4(info.formats[position_240p].url, client, message.from,  `${info.title}.mp4`);
            ++constants.youtube_video_counter
            }
            catch(error){
                client.sendText(message.from, messages.UNKNOWN_ERROR('Youtube Video'))
                ++constants.youtube_video_errors
                console.log(`
                Error when trying to process Youtube to MP4
                From: ${message.from}
                Error: ${error}
                `)
            }
        }
        else{
            await client.sendText(message.from, messages.MAX_LIMIT('video', max_video_duration / 60));
        }

    }


}