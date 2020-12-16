// Sticker command - Converts an image to sticker

const wa = require('@open-wa/wa-automate');
const messages = require('../data/messages');
const constants = require('../data/constants');


module.exports = Sticker = async (client, message, arguments) => {

  switch(message.type){

    case 'video':
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