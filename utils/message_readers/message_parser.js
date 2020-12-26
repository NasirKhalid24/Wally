const constants = require('../../data/constants');
const decode_message = require('./decode_message');
const Sticker = require('../../commands/Sticker');
const Youtube = require('../../commands/Youtube');
const Help = require('../../commands/Help');
const Terms_conditions = require('../../commands/Terms_conditions');
const Twitter = require('../../commands/Twitter');
const Instagram = require('../../commands/Instagram');
const { createUserAgent } = require('@open-wa/wa-automate/dist/config/puppeteer.config');
const Usage = require('../../commands/Usage');
// const Facebook = require('../../commands/Facebook');
// const Test = require('../commands/Test');

module.exports = message_parser = async(client, message) => {

    try{
        // Get entire argument wheter its chat or media type
        let body = '';

        if(message.type === 'chat'){
            body = message.body;
        }else if(message.caption){
            body = message.caption;
        }

        if(constants.users.includes(message.from)){
            var s = s
        }
        else{
            constants.users.push(message.from)
        }

        let command_and_arguments = decode_message(body, constants.MESSAGE_PREFIX, constants.ARGUMENT_PREFIX, constants.VALUE_PREFIX);
        
        // SHAPE OF MESSAGE AND ARGUMENTS
        // let message_and_arguments: {
        //     command: string;
        //     arguments: any[];
        // }

        switch(command_and_arguments.command){

            case '':{
                await Sticker(client, message, command_and_arguments.arguments);
                break
            }

            case 'sticker':{
                await Sticker(client, message, command_and_arguments.arguments);
                break
            }

            case 'youtube':{
                await Youtube(client, message, command_and_arguments.arguments);
                break
            }

            // case 'test':{
            //     Test(client, message, command_and_arguments.arguments);
            //     break
            // }

            case 'help':{
                await Help(client, message, command_and_arguments.arguments);
                break
            }

            case 'tc':{
                await Terms_conditions(client, message, command_and_arguments);
                break
            }

            case 'twitter':{
                await Twitter(client, message, command_and_arguments.arguments);
                break
            }

            case 'usage_root':{
                await Usage(client, message, command_and_arguments.arguments);
                break
            }

            // case'instagram':{
            //     await Instagram(client,message,command_and_arguments.arguments);
            //     break
            // }

            // case'facebook':{
            //     await Facebook(client,message,command_and_arguments.arguments);
            // }
        }

    } catch(err){
        console.log("ERROR IN MESSAGE PARSER = ", err);
    }

}