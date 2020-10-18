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

module.exports = decode_message = (body, command_prefix, argument_prefix, value_prefix) => {
    
    // Create REGEX for getting the command
    const REGEX_COMMAND = new RegExp(`${command_prefix}(\\w+)`, 'gi');
    // Create REGEX for getting the argument
    const ARGS_COMMAND = new RegExp(`${argument_prefix}(\\w+)${value_prefix}?([a-zA-Z0-9_ ]+)`, 'gi');

    // Template for return value
    let return_val = {
        "command": "",
        "arguments": []
    };
    
    // If no body passed or body does not have command return empty return
    if(body.trim() === "" || !body.trim().includes(command_prefix)){
        return return_val;
    }

    // Check for Youtube links
    
    // Extract the command from message (if multiple only returns the first)
    return_val.command = REGEX_COMMAND.exec(body)[1].toLowerCase();

    // Extract the arguments from message (can return multiple)
    let args_extracted = body.match(ARGS_COMMAND);

    // If no arguments passed
    if(args_extracted === null){
        return return_val;
    }

    // If there are arguments then create their objects and append them
    for(var i=0; i<args_extracted.length; i++){
        let x = args_extracted[i].trim().split(value_prefix);
        let r = {"argument":"","value":""}
        if(x.length === 1){
            r.argument = x[0].split(argument_prefix)[1].toLowerCase();
            r.value = null;
        }else if(x.length === 2){
            r.argument = x[0].split(argument_prefix)[1].toLowerCase();
            r.value = x[1].trim();
        }
        return_val.arguments.push(r);
    }

    return return_val;
}