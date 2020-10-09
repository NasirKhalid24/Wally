const constants = require('../data/constants');
const decode_message = require('./decode_message');
const Sticker = require('../commands/Sticker');

// const Test = require('../commands/Test');

module.exports = message_parser = async(client, message) => {

    try{
        // Get entire argument wheter its chat or media type - if null then return and send message

        let body = '';

        if(message.type === 'chat'){
            body = message.body;
        }else{
            body = message.caption;
        }

        body = body.toLowerCase().trim();
        
        let command_and_arguments = decode_message(body, constants.MESSAGE_PREFIX, constants.ARGUMENT_PREFIX, constants.VALUE_PREFIX);
        
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