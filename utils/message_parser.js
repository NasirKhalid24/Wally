
module.exports = message_parser = async(client, message) => {

    try{
        // TO DO LIST FOR MESSAGE PARSER
        // 1. check if message starts with the PREFIX
        // 2. make sure message is not from a group
        // 3. import some library to keep track of time
        // 4. after checking from prefix get the 'sticker' keyword (switch statement so we can add other keywords in future)
        // 5. extract all images from message in case they send multiple
        // 6. send back all images as stickers

        if (message.body === 'Hi') {
            client.sendText(message.from, '👋👋🏼 Hello!');
        }

    } catch(err){
        console.log("ERROR IN MESSAGE PARSER = ", err);
    }

}