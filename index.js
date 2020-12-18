const wa = require('@open-wa/wa-automate');

const message_parser = require('./utils/message_parser');
const messages = require('./data/messages');

const { default: PQueue } = require("p-queue");

async function launch(){
    try{
        const client = await wa.create({
            //sets restartOnCrash to the above `start` function
            restartOnCrash: start,

            //log all browser console output
            logConsole: false,

            // Use Chrome (to send videos)
            useChrome: true,

            //or just browser errors
            logConsoleErrors: false,

            //kill the process if the browser crashes/is closed manually
            killProcessOnBrowserClose: true
            
        });
        await start(client);
    } catch(error){
        console.log(error)
    }
}

const queue = new PQueue({
  concurrency: 4,
  autoStart:false
   });

const proc = async (client, message) => {
    await message_parser(client, message);
    
    // await client.clearChat(message.from)
    
    return true;
}

const processMessage = (client, message) => queue.add(()=>proc(client, message));

async function start(client) {

    try{
        // Handling any changes to the state of the bot 
        client.onStateChanged(state=>{
            console.log('STATE CHANGE = ', state)
            if(state==="CONFLICT" || state==="UNLAUNCHED") client.forceRefocus();
        
            if(state==='UNPAIRED') console.log('Got logged out! Restart server and scan QR code!')
        });

        const unreadMessages = await client.getAllUnreadMessages();
        unreadMessages.forEach( m => processMessage(client, m))

        // Handling incoming messages
        client.onMessage(message => {
            // Sent to message parser to handle user interactions
            // await message_parser(client, message);
            processMessage(client, message)
        });

        // Handling incoming Whatsapp calls
        client.onIncomingCall(async call=>{
            await client.sendText(call.peerJid, messages.ON_CALL );
        });

        // Handle being added to group
        client.onAddedToGroup(({ groupMetadata: { id }, contact: { name } }) => {
            client.sendText(id, messages.ON_GROUP).then(() => client.leaveGroup(id))
        })
        
        queue.start();

    }catch(error){
        client.kill();
        console.log("ERROR = ", error)
    }

}

launch();