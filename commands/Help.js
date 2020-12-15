// Help command - Send help information

const wa = require('@open-wa/wa-automate');
const messages = require('../data/messages');

module.exports = Sticker = async (client, message, arguments) => {

    await client.sendText(message.from, messages.HELP_MESSAGE);
    
}