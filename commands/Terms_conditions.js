// t&c command - Send terms and conditions 

const wa = require('@open-wa/wa-automate');
const constants = require('../data/constants');

module.exports = Sticker = async (client, message, arguments) => {

    await client.sendText(message.from, constants.TERMS_CONDITIONS_MESSAGE);
    
}