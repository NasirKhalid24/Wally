// Twitter command - Downloads twitter videos
const wa = require('@open-wa/wa-automate');

const sendConvertedMP3 = require('../utils/file_senders/sendConvertedMP3');
const getVideoInfo = require('../utils/data_downloaders/getVideoInfo');
const sendConvertedMP4 = require('../utils/file_senders/sendConvertedMP4');
const messages = require('../data/messages');
const constants = require('../data/constants');


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

        if(obj_["argument"] === "audio"){
            audio_url = true
        }
    }

    // Get Info
    const info = await getVideoInfo(url);
        
    // If video private, undefined or url does not exist then info will be empty
    if(Object.keys(info).length === 0){
        await client.sendText(message.from, messages.INVALID_TWEET);      
    }

    // If user requests audio only
    else if(audio_url === true){

        try{
            //http-832
            var position = info.formats.findIndex(x => x.format_id.includes('http'))

            if(position !== -1 ){
                var tweet_url = info.formats[position].url
            }
            else{
                position = info.formats.findIndex(x=> x.includes('http') )
                var tweet_url = info.formats[position].url
            }

            if(info._duration_raw <= max_audio_duration){
                
                await client.sendText(message.from, messages.INFO_FOUND('Audio', info.title));
                await sendConvertedMP3(tweet_url, client, message.from, `${info.title}.mp3`);
                ++constants.twitter_audio_counter

            }
            else{
                await client.sendText(message.from, messages.MAX_LIMIT('audio', max_audio_duration / 60));
            }
        }

        catch(error){

            client.sendText(message.from, messages.UNKNOWN_ERROR('Twitter Audio'))
                ++constants.twitter_audio_errors
                console.log(`
                Error when trying to process Twitter to MP3
                From: ${message.from}
                Error: ${error}
                `)

        }

    }

    // If user wants video
    else{

        try{
            //http-832
            var position = info.formats.findIndex(x => x.format_id.includes('http'))

            if(position !== -1 ){
                var tweet_url = info.formats[position].url
            }
            else{
                var tweet_url = info.formats[0].url            }
          
            // If video is less than max length
            if(info._duration_raw <= max_video_duration){

                await client.sendText(message.from, messages.INFO_FOUND('Video', info.title));
                await sendConvertedMP4(tweet_url, client, message.from, `${info.title}.mp4`);
                ++constants.twitter_video_counter
        
            }
            else{

                await client.sendText(message.from, messages.MAX_LIMIT('video', max_video_duration / 60));

            }
        }

        catch(error){
            client.sendText(message.from, messages.UNKNOWN_ERROR('Twitter Video'))
                ++constants.twitter_video_errors
                console.log(`
                Error when trying to process Twitter to MP4
                From: ${message.from}
                Error: ${error}
                `)
            
        }


    }
}