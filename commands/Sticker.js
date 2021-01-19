// Sticker command - Converts an image to sticker

const wa = require('@open-wa/wa-automate');
const messages = require('../data/messages');
const constants = require('../data/constants');


module.exports = Sticker = async (client, message, arguments) => {

  switch(message.type){
    case 'video':
      {
        var vid_to_gif_duration = 6;
        var file_size = 4000000;
   
        if (message.duration <= vid_to_gif_duration && message.size < file_size){
          if(typeof message.caption !== 'undefined' && message.caption.toLowerCase().includes('gif')){
            try{
            const mediaData = await wa.decryptMedia(message);
            const gifbase64 = `data:${message.mimetype};base64,${mediaData.toString(
              'base64'
            )}`;
            await client.sendVideoAsGif(message.from,gifbase64);  
            ++constants.gif_log
            break  
            }
            catch(error){
              client.sendText(message.from, messages.UNKNOWN_ERROR('sticker'))
              ++constants.gif_errors
              
              console.log(`
              Error when trying to process MP4 to GIF
              From: ${message.from}
              Error: ${error}
              `)
            }  
          }
          else{
          try{
            const mediaData = await wa.decryptMedia(message);
            const videobase64 = `data:${message.mimetype};base64,${mediaData.toString(
              'base64'
            )}`;
            await client.sendMp4AsSticker(message.from,videobase64,{fps: 08, startTime: `00:00:00.0`, endTime :  `00:00:06.0`, loop: 0, crop: false
            });   
            ++constants.mp4_sticker_log 
            break  
            }
          catch(error){
            client.sendText(message.from, messages.UNKNOWN_ERROR('Sticker'))
              ++constants.mp4_sticker_errors
              console.log(`
              Error when trying to process MP4 to Sticker
              From: ${message.from}
              Error: ${error}
              `)
            }
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
          try{
          const mediaData = await wa.decryptMedia(message);
          const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
            'base64'
          )}`;

          await client.sendImageAsSticker(message.from, imageBase64);
          ++constants.sticker_counter
          }
          catch(error){
            client.sendText(message.from, messages.UNKNOWN_ERROR('Sticker'))
            ++constants.sticker_errors
            console.log(`
            Error when trying to process Image to Sticker
            From: ${message.from}
            Error: ${error}
            `)
          }
        }
        break
    }

    case('chat'):{
      await client.sendText(message.from, messages.STICKER_NON_IMAGE_MESSAGE);
      break
    }

    case('image'):{
      try{
        const mediaData = await wa.decryptMedia(message);
        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
          'base64'
        )}`;

        await client.sendImageAsSticker(message.from, imageBase64);
        ++constants.sticker_counter
        break
      }
      catch(error){
        client.sendText(message.from, messages.UNKNOWN_ERROR('Sticker'))
        ++constants.sticker_errors 
        console.log(`
        Error when trying to process Image to Sticker
        From: ${message.from}
        Error: ${error}
        `)
      }
    }
  }

}