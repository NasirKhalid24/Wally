const youtube_link_extractor = require('../utils/youtube_link_extractor');

const return_template = {
    "command": "",
    "arguments": []
};

test("Blank Input", () => {
    let output = Object.assign({},return_template);
    expect(youtube_link_extractor("", Object.assign({},return_template))).toStrictEqual(output);
})

test("Single Link", () => {
    let output = Object.assign({},return_template);
    output.command = "youtube";
    output.arguments = [{
        "argument": "url",
        "value": "https://www.youtube.com/watch?v=HH6dDxIoeuM"
    }]
    
    expect(youtube_link_extractor("https://www.youtube.com/watch?v=HH6dDxIoeuM", Object.assign({},return_template))).toStrictEqual(output);
})

test("Multiple Links", () => {
    let output = Object.assign({},return_template);
    output.command = "error";
    output.arguments = [{
        "argument": "message",
        "value": "Multiple links found in message!\nPlease send one at a time"
    }]

    expect(youtube_link_extractor("https://www.youtube.com/watch?v=HH6dDxIoeuM https://www.youtube.com/watch?v=m7GkDXDsAtc", Object.assign({},return_template))).toStrictEqual(output);
})

test("Single Link with Extra Text (back and front)", () => {
    let output = Object.assign({},return_template);
    output.command = "youtube";
    output.arguments = [{
        "argument": "url",
        "value": "https://www.youtube.com/watch?v=HH6dDxIoeuM"
    }]

    expect(youtube_link_extractor("download this youtube vidhttps://www.youtube.com/watch?v=HH6dDxIoeuM", Object.assign({},return_template))).toStrictEqual(output);
})

test("Share Link", () => {
    let output = Object.assign({},return_template);
    output.command = "youtube";
    output.arguments = [{
        "argument": "url",
        "value": "https://youtu.be/m7GkDXDsAtc"
    }]

    expect(youtube_link_extractor("https://youtu.be/m7GkDXDsAtc", Object.assign({},return_template))).toStrictEqual(output);
})

test("Embed Link", () => {
    let output = Object.assign({},return_template);
    output.command = "youtube";
    output.arguments = [{
        "argument": "url",
        "value": "www.youtube.com/embed/DFYRQ_zQ-gk"
    }]

    expect(youtube_link_extractor("www.youtube.com/embed/DFYRQ_zQ-gk this link", Object.assign({},return_template))).toStrictEqual(output);
})

test("Mobile Link", () => {
    let output = Object.assign({},return_template);
    output.command = "youtube";
    output.arguments = [{
        "argument": "url",
        "value": "https://m.youtube.com/watch?v=DFYRQ_zQ-gk"
    }]

    expect(youtube_link_extractor("https://m.youtube.com/watch?v=DFYRQ_zQ-gk", Object.assign({},return_template))).toStrictEqual(output);
})