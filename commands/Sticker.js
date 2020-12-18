// Sticker command - Converts an image to sticker

const wa = require('@open-wa/wa-automate');
const messages = require('../data/messages');
const constants = require('../data/constants');


module.exports = Sticker = async (client, message, arguments) => {

  switch(message.type){
    case 'video':
      {
        var vid_to_gif_duration = 10;
        var gif_log = 0;
        var mp4_sticker_log = 0;
   
        if (message.duration <= vid_to_gif_duration){
          if(typeof message.caption !== 'undefined' && message.caption.toLowerCase().includes('gif')){
            const mediaData = await wa.decryptMedia(message);
            const gifbase64 = `data:${message.mimetype};base64,${mediaData.toString(
              'base64'
            )}`;
            await client.sendVideoAsGif(message.from,gifbase64);  
            console.log('Number of video to gif used', ++gif_log);  
            break    
          }
          else{
          const mediaData = await wa.decryptMedia(message);
          const videobase64 = `data:${message.mimetype};base64,${mediaData.toString(
            'base64'
          )}`;
          await client.sendMp4AsSticker(message.from,videobase64);   
          console.log('Number of video to sticker used', ++mp4_sticker_log);  
 
          break  
          }  
        }
        else{
          await client.sendText(message.from, messages.VIDEO_TO_STICKER_GIF_LENTGH);
          break
        }
      }
    case 'audio':
    case 'location':
    case 'vcard':
      {
        await client.sendText(message.from, messages.STICKER_NON_IMAGE_MESSAGE);
        break
      }

    case('document'):{
        var document_type = message.mimetype

        if(document_type != 'image/png' && document_type != 'image/jpg' && document_type != 'image/jpeg'){
            await client.sendText(message.from, messages.STICKER_INVALID_IMAGE);
        }
        else{
          const mediaData = await wa.decryptMedia(message);
          const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
            'base64'
          )}`;

          await client.sendImageAsSticker(message.from, imageBase64);
          console.log('Sticker Functions used today', ++constants.sticker_counter)
        }
        break
    }

    case('chat'):{
      await client.sendText(message.from, messages.STICKER_NON_IMAGE_MESSAGE);
      break
    }

    case('image'):{
        const mediaData = await wa.decryptMedia(message);
        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
          'base64'
        )}`;

        await client.sendImageAsSticker(message.from, imageBase64);
        console.log('Sticker Functions used today', ++constants.sticker_counter)
        break
    }
  }

}