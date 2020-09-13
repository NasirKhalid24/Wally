const wa = require('@open-wa/wa-automate');

const message_parser = require('./utils/message_parser');
const MESSAGE_PREFIX = '!';

wa.create().then(client => start(client));

function start(client) {

    // Handling any changes to the state of the bot 
    client.onStateChanged(state=>{
        console.log('STATE CHANGE = ', state)
        if(state==="CONFLICT" || state==="UNLAUNCHED") client.forceRefocus();
    
        if(state==='UNPAIRED') console.log('Got logged out! Restart server and scan QR code!')
      });

    // Handling incoming messages
    client.onMessage(message => {
        if (message.body === 'Hi') {
        client.sendText(message.from, '👋 Hello!');
        }
    });

    // Handling incoming Whatsapp calls
    client.onIncomingCall(async call=>{
        await client.sendText(call.peerJid._serialized, 'Sorry, I cannot accept calls 📵');
    });

    // Handle being added to group
    client.onAddedToGroup(({ groupMetadata: { id }, contact: { name } }) => {
        client.sendText(id, 'Sorry I cannot be added to groups (as of now 😉)').then(() => client.leaveGroup(id))
    })

}