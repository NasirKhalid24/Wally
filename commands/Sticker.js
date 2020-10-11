// Sticker command - Converts an image to sticker

const wa = require('@open-wa/wa-automate');

module.exports = Sticker = async (client, message, arguments) => {

  switch(message.type){

    case 'video':
    case 'audio':
    case 'location':
    case 'vcard':
      {
        await client.sendText(message.from, 'Sorry!, this media doesn\'t seem to be an image, send an image pls');
        break
      }

    case('document'):{
        var document_type = message.mimetype

        if(document_type != 'image/png' && document_type != 'image/jpg' && document_type != 'image/jpeg'){
            await client.sendText(message.from, 'Sorry!, this media doesn\'t seem to be an image, send an image pls');
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
      await client.sendText(message.from, 'Sorry!, I couldn\'t find an image in the message! \n Please sent an Image with the caption #sticker');
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