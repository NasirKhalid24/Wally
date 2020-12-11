// Help command - Send help information

const wa = require('@open-wa/wa-automate');
const constants = require('../data/constants');

module.exports = Sticker = async (client, message, arguments) => {

    await client.sendText(message.from, constants.HELP_MESSAGE);
    
}