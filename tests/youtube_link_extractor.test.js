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
        "value": "youtube.com/watch?v=HH6dDxIoeuM"
    }]
    
    expect(youtube_link_extractor("https://www.youtube.com/watch?v=HH6dDxIoeuM", Object.assign({},return_template))).toStrictEqual(output);
})

test("Multiple Links", () => {
    let output = Object.assign({},return_template);
    output.command = "youtube";
    output.arguments = [{
        "argument": "url",
        "value": "https://www.youtube.com/watch?v=HH6dDxIoeuM"
    }]

    expect(youtube_link_extractor("https://www.youtube.com/watch?v=HH6dDxIoeuMhttps://www.youtube.com/watch?v=m7GkDXDsAtc", Object.assign({},return_template))).toStrictEqual(output);
})

test("Single Link with Extra Text (back and front)", () => {
    let output = Object.assign({},return_template);
    output.command = "youtube";
    output.arguments = [{
        "argument": "url",
        "value": "https://www.youtube.com/watch?v=HH6dDxIoeuM"
    }]

    expect(youtube_link_extractor("download this youtube vidhttps://www.youtube.com/watch?v=HH6dDxIoeuMthanks", Object.assign({},return_template))).toStrictEqual(output);
})

test("Share Link", () => {
    let output = Object.assign({},return_template);
    output.command = "youtube";
    output.arguments = [{
        "argument": "url",
        "value": "https://www.youtube.com/watch?v=HH6dDxIoeuM"
    }]

    expect(youtube_link_extractor("https://youtu.be/m7GkDXDsAtc", Object.assign({},return_template))).toStrictEqual(output);
})