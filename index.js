const wa = require('@open-wa/wa-automate');

const message_parser = require('./utils/message_parser');
const MESSAGE_PREFIX = '!';

async function launch(){
    try{
        const client = await wa.create({
            //sets restartOnCrash to the above `start` function
            restartOnCrash: start,

            //log all browser console output
            logConsole: true,

            //or just browser errors
            logConsoleErrors: true,

            //kill the process if the browser crashes/is closed manually
            killProcessOnBrowserClose: true
        });
        await start(client);
    } catch(error){
        console.log(error)
    }
}

function start(client) {

    try{
        // Handling any changes to the state of the bot 
        client.onStateChanged(state=>{
            console.log('STATE CHANGE = ', state)
            if(state==="CONFLICT" || state==="UNLAUNCHED") client.forceRefocus();
        
            if(state==='UNPAIRED') console.log('Got logged out! Restart server and scan QR code!')
        });

        // Handling incoming messages
        client.onMessage(message => {
            message_parser(client, message);
        });

        // Handling incoming Whatsapp calls
        client.onIncomingCall(async call=>{
            await client.sendText(call.peerJid._serialized, 'Sorry I cannot accept calls 📵');
        });

        // Handle being added to group
        client.onAddedToGroup(({ groupMetadata: { id }, contact: { name } }) => {
            client.sendText(id, 'Sorry I cannot be added to groups (as of now 😉)').then(() => client.leaveGroup(id))
        })
        
    }catch(error){
        client.kill();
        console.log("ERROR = ", error)
    }

}

launch();