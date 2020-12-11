// Youtube command - Downloads youtube video

const wa = require('@open-wa/wa-automate');
const youtubedl = require('youtube-dl');
const {performance} = require('perf_hooks');

module.exports = Youtube = async (client, message, arguments) => {
    
    let url = ""
    
    for (let index = 0; index < arguments.length; index++) {
        const obj_ = arguments[index];

        if(obj_["argument"] === "url"){
            url = obj_["value"];
        }
    }
    
    youtubedl.getInfo(url,function(err, info)  {
        if(typeof info === 'undefined'){
            client.sendText(message.from, 'The link seems to be invalid...\nPlease ensure its not a private video');      
            }
        else{
            if(info._duration_raw >= 300){
                var position_240p = info.formats.findIndex(x => x.format_id == '133')
                if(info.formats[position_240p].filesize <= 25000000 && info._duration_raw < 900){
                    client.sendText(message.from, `Video "${info.title}" found\n\nThis may take a while, please wait. \n\nDownloading ⏳`);
                    client.sendFileFromUrl(message.from, info.formats[position_240p].url,`${info.title}.mp4`);
                }
                else{
                    client.sendText(message.from, 'This video is too long to send on Whatsapp\nPlease ensure the video is 15 mins or less');
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