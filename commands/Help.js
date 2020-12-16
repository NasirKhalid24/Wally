// Help command - Send help information

const wa = require('@open-wa/wa-automate');
const messages = require('../data/messages');
const constants = require('../data/constants');


module.exports = Sticker = async (client, message, arguments) => {

    await client.sendText(message.from, messages.HELP_MESSAGE);
    console.log('Help function used today', ++constants.help_counter)
    
}