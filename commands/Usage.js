const wa = require('@open-wa/wa-automate');
const messages = require('../data/messages');
const constants = require('../data/constants');

var datetime = new Date();

module.exports = Usage = async (client, message, arguments) => {

    if(message.from === '971545667155@c.us' || message.from === '971569915722@c.us'){
        var usage;

        usage = `
Welcome ${message.sender.pushname},

Here's the Stats since last Server Reset: ${datetime}

--------Total Users-------
Total Users: ${constants.users.length}

-----Stickers & Gifs------

Sticker Functions used: ${constants.sticker_counter}
MP4 to Sticker: ${constants.mp4_sticker_log}
MP4 to GIF: ${constants.gif_log}

----Errors in Stickers-----
Errors in Stickers: ${constants.sticker_errors}
Errors in MP4 to Sticker: ${constants.mp4_sticker_errors}
Errors in MP4 to GIF: ${constants.gif_errors}

----Video & Audio-----
Total Videos Downloaded: ${constants.video_counter}
Total Audio Downloaded: ${constants.audio_counter}

------Youtube-----
Videos: ${constants.youtube_video_counter}
Errors in Video: ${constants.youtube_video_errors}
Audio: ${constants.youtube_audio_counter}
Errors in Audio:${constants.youtube_audio_errors}

------Twitter------
Videos: ${constants.twitter_video_counter}
Errors in Video: ${constants.twitter_video_errors}
Audio: ${constants.twitter_audio_counter}
Errors in Audio: ${constants.twitter_audio_errors}

        `
        client.sendText(message.from, usage)
    }
    else{
        client.sendText(message.from, messages.STICKER_NON_IMAGE_MESSAGE)
    }

   
}