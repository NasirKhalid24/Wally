const wa = require('@open-wa/wa-automate');

const sendConvertedMP3 = require('../utils/file_senders/sendConvertedMP3');
const getVideoInfo = require('../utils/data_downloaders/getVideoInfo');
const sendConvertedMP4 = require('../utils/file_senders/sendConvertedMP4');
const messages = require('../data/messages');
const getVideoDurationInSeconds = require('../utils/data_downloaders/getVideoDurationInSeconds');


module.exports = Instagram = async (client, message, arguments) => {
    
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

    // To deal with instagram reels
    url = url.replace("reel", "p");

    // Get Info
    const info = await getVideoInfo(url);

    if(Object.keys(info).length > 1 && Object.keys(info).length < 20){

        var vid_count = 0;

        if(audio_url === true){

            for (const key in info) {

                var video_duration = await getVideoDurationInSeconds(info[key].url);
    
                if (video_duration <= max_audio_duration){
                
                    await client.sendText(message.from, messages.INFO_FOUND('Audio', `${info[key].playlist_title} - Audio ${++vid_count}`));
                    await sendConvertedMP3(info[key].url, client, message.from,  `${info[key].playlist_title}-Audio-${vid_count}.mp4`);
                
                }else{
                    await client.sendText(message.from, messages.MAX_LIMIT('audio', max_video_duration / 60));
                }
    
            }

        }else{

            for (const key in info) {

                var video_duration = await getVideoDurationInSeconds(info[key].url);
    
                if (video_duration <= max_video_duration){
                
                    await client.sendText(message.from, messages.INFO_FOUND('Video', `${info[key].playlist_title} - Video ${++vid_count}`));
                    await sendConvertedMP4(info[key].url, client, message.from,  `${info[key].playlist_title}-Video-${vid_count}.mp4`);
                
                }else{
                    await client.sendText(message.from, messages.MAX_LIMIT('video', max_video_duration / 60));
                }
    
            }

        }
        
    }else{

        // If video private, undefined or url does not exist then info will be empty
        if(Object.keys(info).length === 0){
            await client.sendText(message.from, messages.INVALID_INSTA);      
        }


        // If user requests audio only
        else if(audio_url === true){

            var position = info.formats.findIndex(x => x.format_id == '0')

            var video_duration = await getVideoDurationInSeconds(info.formats[position].url);

            if(video_duration <= max_audio_duration){
                
                await client.sendText(message.from, messages.INFO_FOUND('Audio', info.description.slice(0, 20) + "... by @" + info.uploader_id));
                await sendConvertedMP3(info.formats[position].url, client, message.from, `${info.description.slice(0, 20) + "... by @" + info.uploader_id}.mp3`)

            }
            else{
                await client.sendText(message.from, messages.MAX_LIMIT('audio', max_audio_duration / 60));
            }

        }


        // If user wants video
        else{

            var position = info.formats.findIndex(x => x.format_id == '0')

            var video_duration = await getVideoDurationInSeconds(info.formats[position].url);

            if (video_duration <= max_video_duration){
            
                await client.sendText(message.from, messages.INFO_FOUND('Video', info.description.slice(0, 20) + "... by @" + info.uploader_id));
                await sendConvertedMP4(info.formats[position].url, client, message.from,  `${info.description.slice(0, 20) + "... by @" + info.uploader_id}.mp4`);
            
            }else{
                await client.sendText(message.from, messages.MAX_LIMIT('video', max_video_duration / 60));
            }

        }

    }

}