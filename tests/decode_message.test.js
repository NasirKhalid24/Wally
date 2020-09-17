const decode_message = require('../utils/decode_message');

const MESSAGE_PREFIX = '#'
const ARGUMENT_PREFIX = '-'
const VALUE_PREFIX = '='

let return_template = {
    "command": "",
    "arguments": []
};

test("Blank Input", () => {
    let output = return_template;
    expect(decode_message("", MESSAGE_PREFIX, ARGUMENT_PREFIX, VALUE_PREFIX)).toStrictEqual(output);
})

test("Only arguments no command", () => {
    let output = return_template;
    expect(decode_message(`${ARGUMENT_PREFIX}bottomtext${VALUE_PREFIX}hey how are u`, MESSAGE_PREFIX, ARGUMENT_PREFIX, VALUE_PREFIX)).toStrictEqual(output);
})

test("Random text - ewjudnewdnmweuind", () => {
    let output = return_template;
    expect(decode_message("ewjudnewdnmweuind", MESSAGE_PREFIX, ARGUMENT_PREFIX, VALUE_PREFIX)).toStrictEqual(output);
})

test(`Random text with command inside - ewjudnewdn${MESSAGE_PREFIX}face`, () => {
    let output = return_template;
    output.command = "face";
    expect(decode_message(`ewjudnewdn${MESSAGE_PREFIX}face`, MESSAGE_PREFIX, ARGUMENT_PREFIX, VALUE_PREFIX)).toStrictEqual(output);
})


test(`${MESSAGE_PREFIX}sticker ${ARGUMENT_PREFIX}face${VALUE_PREFIX}2 ${ARGUMENT_PREFIX}bottom${VALUE_PREFIX}hey how are u doing`, () => {
    let output = return_template;
    output.command = "sticker";
    output.arguments = [
        {
            "argument": "face",
            "value": "2"
        },
        {
            "argument": "bottom",
            "value": "hey how are u doing"
        }
    ]
    expect(decode_message(`${MESSAGE_PREFIX}sticker ${ARGUMENT_PREFIX}face${VALUE_PREFIX}2 ${ARGUMENT_PREFIX}bottom${VALUE_PREFIX}hey how are u doing`, MESSAGE_PREFIX, ARGUMENT_PREFIX, VALUE_PREFIX)).toStrictEqual(output);
})

test(`${MESSAGE_PREFIX}sticker ${ARGUMENT_PREFIX}face`, () => {
    let output = return_template;
    output.command = "sticker";
    output.arguments = [
        {
            "argument": "face",
            "value": null
        }
    ]
    expect(decode_message(`${MESSAGE_PREFIX}sticker ${ARGUMENT_PREFIX}face`, MESSAGE_PREFIX, ARGUMENT_PREFIX, VALUE_PREFIX)).toStrictEqual(output);
})

test(`${MESSAGE_PREFIX}stICker ${ARGUMENT_PREFIX}fAce`, () => {
    let output = return_template;
    output.command = "sticker";
    output.arguments = [
        {
            "argument": "face",
            "value": null
        }
    ]
    expect(decode_message(`${MESSAGE_PREFIX}stICker ${ARGUMENT_PREFIX}fAce`, MESSAGE_PREFIX, ARGUMENT_PREFIX, VALUE_PREFIX)).toStrictEqual(output);
})

test(`${MESSAGE_PREFIX}sticker ${MESSAGE_PREFIX}gif ${ARGUMENT_PREFIX}face`, () => {
    let output = return_template;
    output.command = "sticker";
    output.arguments = [
        {
            "argument": "face",
            "value": null
        }
    ]
    expect(decode_message(`${MESSAGE_PREFIX}sticker ${MESSAGE_PREFIX}gif ${ARGUMENT_PREFIX}face`, MESSAGE_PREFIX, ARGUMENT_PREFIX, VALUE_PREFIX)).toStrictEqual(output);
})

test(`${MESSAGE_PREFIX}sticker ${MESSAGE_PREFIX}gif ${ARGUMENT_PREFIX}face=5`, () => {
    let output = return_template;
    output.command = "sticker";
    output.arguments = [
        {
            "argument": "face",
            "value": "5"
        }
    ]
    expect(decode_message(`${MESSAGE_PREFIX}sticker ${MESSAGE_PREFIX}gif ${ARGUMENT_PREFIX}face=5`, MESSAGE_PREFIX, ARGUMENT_PREFIX, VALUE_PREFIX)).toStrictEqual(output);
})