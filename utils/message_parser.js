const MESSAGE_PREFIX = '#'
const ARGUMENT_PREFIX = '-'
const VALUE_PREFIX = '='

const decode_message = require('./decode_message');
// const Test = require('../commands/Test');
const Sticker = require('../commands/Sticker');
const Empty = require('../commands/Empty');

module.exports = message_parser = async(client, message) => {

    try{
        // Get entire argument wheter its chat or media type - if null then return and send message
        let body = message.body;
        body = body.toLowerCase().trim();

        if(message.type !== 'chat'){
            body = message.caption;

            if(body === ""){
                client.sendText(message.from, 'No text found in message!');
                return;
            }
        }

        let command_and_arguments = decode_message(body, MESSAGE_PREFIX, ARGUMENT_PREFIX, VALUE_PREFIX);
        
        // SHAPE OF MESSAGE AND ARGUMENTS
        // let message_and_arguments: {
        //     command: string;
        //     arguments: any[];
        // }

        switch(command_and_arguments.command){

            case '':{
                Sticker(client, message, command_and_arguments.arguments);
                break
            }

            case 'sticker':{
                Sticker(client, message, command_and_arguments.arguments);
                break
            }

            case 'test':{
                // Test(client, message, command_and_arguments.arguments);
                break
            }
        }

    } catch(err){
        console.log("ERROR IN MESSAGE PARSER = ", err);
    }

}