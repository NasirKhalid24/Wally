// Sticker command - Converts an image to sticker

const wa = require('@open-wa/wa-automate');

module.exports = Sticker = async (client, message, arguments) => {

    if (message.mimetype != null & message.type === 'image') {
        const mediaData = await wa.decryptMedia(message);
        const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
          'base64'
        )}`;

        await client.sendImageAsSticker(message.from, imageBase64);
    }
}