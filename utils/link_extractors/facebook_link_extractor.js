//(https?:\/\/(?:www\.)?instagram\.com\/p\/([^/?#&]+)).*

module.exports = instagram_link_extractor = (message_text, return_val) => {

    const FACEBOOK_REGEX = new RegExp("(?:https?:\\/\\/)?(?:www\\.)?(?:facebook|fb|m\\.facebook)\\.(?:com|me|watch)\\/(?:(?:\\w)*#!\\/)?(?:pages\\/)?(?:[\\w\\-]*\\/)*([\\w\\-\\.]+)(?:\\/)?", "gmi");

    let links = message_text.match(FACEBOOK_REGEX)
    if(Array.isArray(links)){
        if(links.length === 1){
            return_val.command = "facebook"
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