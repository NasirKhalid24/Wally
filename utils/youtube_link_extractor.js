module.exports = youtube_link_extractor = (message_text, return_val) => {

    const YOUTUBE_REGEX = new RegExp('(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch(?:.*)\?(?:\S*?&?v\=))|youtu\.be\/)((?!control)[a-zA-Z0-9_-]{6,11})', 'gm');

    let links = message_text.match(YOUTUBE_REGEX)
    
    if(links != null){
        return_val.command = "youtube"
        return_val.arguments = [{
            "argument": "url",
            "value": links[0]
        }]
    }

    return return_val;
}