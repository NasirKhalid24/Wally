// EXAMPLE RETURN VALUE
// {
//     "command": "sticker",
//     "arguments": [
//         {
//             "argument": "face",
//             "value": NULL
//         },
//         {
//             "argument": "bottomtext",
//             "value": "This text on the bottom"
//         }
//     ]
// }

// decode_message will return a JSON of the following shape
// {
//     "command": "Here is the one word command that is executed - NULL if error in command or no command",
//     "arguments": "Here is an array with all the arguments passed to the command - NULL if there is no arguments"
// }
//
// Each argument in the arguments will be a JSON of the following shape
// {
//     "argument": "Name of the argument",
//     "value": "Value of the argument - NULL if there is none"
// }

module.exports = decode_message = async(message, command_prefix, argument_prefix) => {
      
    const REGEX_COMMAND = /#(\w+)/;
    
    let return_val = {
        "command": "",
        "arguments": []
    };

    // Get entire argument wheter its chat or media type - if null then return
    let body = message.body;
    if(message.type !== 'chat'){
        body = message.caption;

        if(body === ""){
            return return_val;
        }
    }

    console.log(body);
}