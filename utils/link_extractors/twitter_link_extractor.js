module.exports = twitter_link_extractor = (message_text, return_val) => {

    const TWITTER_REGEX = new RegExp("http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)?\/status\/([a-zA-Z0-9_]+.*)", "gm");

    let links = message_text.match(TWITTER_REGEX)
    if(Array.isArray(links)){
        if(links.length === 1){
            return_val.command = "twitter"
            return_val.arguments = [{
                "argument": "url",
                "value": links[0]
            }]
        }else{
            return_val.command = "error"
            return_val.arguments = [{
                "argument": "message",
                "value": "Multiple links found in message!\nPlease send one at a time"
            }]
        }
    }
    return return_val;
}