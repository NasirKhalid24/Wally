// Sticker command - Converts an image to sticker

const wa = require('@open-wa/wa-automate');
const messages = require('../data/messages')

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
        }
        break
    }

    case('chat'):{
      await client.sendText(message.from, 
        `Hello! 👋

        I am a bot used to simplify tasks!
        
        To find out more about how I can help you, type #help
        
        To contact us, please drop us an email: whatsapphelper@protonmail.com
        
        By using this service you agree to the terms set out by the application. To view our terms and conditions, type #tc
        
        Enjoy! 😁`
      );
      break
    }

    case('image'):{
        const mediaData = await wa.decryptMedia(message);
        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
          'base64'
        )}`;

        await client.sendImageAsSticker(message.from, imageBase64);
        break
    }
  }

}