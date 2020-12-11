// Youtube command - Downloads youtube video

const wa = require('@open-wa/wa-automate');
const youtubedl = require('youtube-dl');
const {performance} = require('perf_hooks');

module.exports = Youtube = async (client, message, arguments) => {
    
    let url = "";
    let audio_url = false;

    for (let index = 0; index < arguments.length; index++) {
        const obj_ = arguments[index];

        if(obj_["argument"] === "url"){
            url = obj_["value"];
        }

        if(obj_["argument"] === "audio"){
            audio_url = true
        }
    }

    youtubedl.getInfo(url,function(err, info)  {

        if(audio_url === true){
            if(info._duration_raw <=900){
            var audio_position = info.formats.findIndex(x => x.format_id == '140')
            client.sendText(message.from, `Audio of "${info.title}" found\n\n Downloading ⏳`);
            client.sendFileFromUrl(message.from, info.formats[audio_position].url,`${info.title}.mp3`);
            }
            else{
                client.sendText(message.from, `Cannot download the Audio \n\n Please ensure the audio is less than 15 minutes`);
            }
        }else if(typeof info === 'undefined'){
            client.sendText(message.from, 'The link seems to be invalid...\nPlease ensure its not a private video');      
        }    
        else{
            
            if(info._duration_raw >= 300){
                var position_240p = info.formats.findIndex(x => x.format_id == '18')
                if(info._duration_raw <= 600){
                    client.sendText(message.from, `Video "${info.title}" found\n\nThis may take a while, please wait. \n\n It may take about 2 to 6 minutes \n\nDownloading ⏳`);
                    client.sendFileFromUrl(message.from, info.formats[position_240p].url,`${info.title}.mp4`);
                }
                else{
                    client.sendText(message.from, 'This video is too long to send on Whatsapp \n\n Please ensure the video is 10 minutes or less');
                }
            }
            else{
 
                client.sendText(message.from, `Video "${info.title}" found\nDownloading ⏳`);
                
                //finding the position of the format array with id 18
                var posi = info.formats.findIndex(x => x.format_id == '18')                
                client.sendFileFromUrl(message.from, info.formats[posi].url);
             
            }
        }
    })
}