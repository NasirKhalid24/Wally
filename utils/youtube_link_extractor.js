module.exports = youtube_link_extractor = (message_text, return_val) => {

    const YOUTUBE_REGEX = new RegExp("((?:https?:)?\\/\\/)?((?:www|m)\\.)?((?:youtube\\.com|youtu.be))(\\/(?:[\\w\\-]+\\?v=|embed\\/|v\\/)?)([\\w\\-]+)(\\S+)", "gm");

    let links = message_text.match(YOUTUBE_REGEX)
    if(Array.isArray(links)){
        if(links.length === 1){
            return_val.command = "youtube"
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