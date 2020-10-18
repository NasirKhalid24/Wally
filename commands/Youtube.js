// Youtube command - Downloads youtube video

const wa = require('@open-wa/wa-automate');
const youtubedl = require('youtube-dl')



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
                client.sendText(message.from, 'This video is too long to send on Whatsapp\nPlease ensure the video is 5 mins or less');
            }
            else{
                client.sendText(message.from, `Video "${info.title}" found\nDownloading ⏳`);
                client.sendFileFromUrl(message.from, info.url);
            }
        }
    })
}