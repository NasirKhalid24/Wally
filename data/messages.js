// Sticker

exports.STICKER_NON_IMAGE_MESSAGE = STICKER_NON_IMAGE_MESSAGE = `Hello! 👋

To learn about my commands, message me "*#help*"

Contact us at: whatsapphelper@protonmail.com

By using this service you agree to the terms set out by the application. To view our terms and conditions, type #tc

Enjoy! 😁`

exports.STICKER_INVALID_IMAGE = STICKER_INVALID_IMAGE = 'Sorry! This media doesn\'t seem to be an image'




// Help

exports.HELP_MESSAGE = HELP_MESSAGE = `
*Whatsapp Helper 🤖*

Here are some commands to try out:

*1.* Send me an image ➡️ I'll send you a sticker


*2.* Send me a youtube link ➡️ I'll download you the video

_demo: https://wa.link/3q0278_ 


*3.* Send me a youtube link and write " -audio " ➡️ I'll send you the audio

_demo: https://wa.link/zd4n5i_




_Coming soon ⌛ - Facebook & Twitter support_

To learn more or send feature requests, contact: whatsapphelper@protonmail.com
`




// Terms and conditons

exports.TC = TC = `
These terms of service constitute a legally binding agreement (the "Agreement") between you (the "User") and us, WEhelper, creators of the Whatsapp Bot with contact number +917025149582 (the "WEH")Your access and use of the the Whatsapp bot to convert images, download media and convert video to audio (hereinafter referred to as the "Bot") constitutes your agreement to be bound by this Agreement, which establishes a contractual relationship between you and WEH. WEH may immediately terminate this Agreement by convenience and without giving notice at any point and may revoke all access rights of the use of the Bot.

WEH does not encourage the use of the Bot that may infringe any rights held by a third party. WEH does not hold any liability for the User's improper use of the service and will not be held liable to any disputes of rights, possible intellectual property infringements or damages that may arise from a third party.

You agree to indemnify and hold WEH harmless from any and all claims, demands, losses, liabilities, and expenses (including attorneys’ fees) arising out of or in connection with your use of the Bot.

You agree to comply with all applicable laws when using the Bot, and you may only use the Bot for lawful purposes.

WEH does not store any data sent to the bot on its local servers and all communication between the bot and you (the "User") is not monitored or tracked by WEH

THE BOT IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT

Please contact whatsapphelper@protonmail.com for further information or notices regarding this Agreement.

`




// Youtube

exports.YOUTUBE_PRIVATE = YOUTUBE_PRIVATE = 'The link seems to be invalid...\nPlease ensure the video is not private'
exports.YOUTUBE_FOUND = (type, title) => {return `${type} of "${title}" found\nDownloading ⏳`}
exports.MAX_LIMIT = (type, limit) =>  { return `This ${type} file is too large to send through Whatsapp \n\nPlease ensure the ${type} is less than ${limit} minutes or less` }




// Send MP3/MP4
exports.TIMEOUT_SENDING = (type) => { return `Timeout while sending ${type} - ensure ${type} is within size limits of Whatsapp chat` }


// Config

exports.ON_CALL = ON_CALL = 'Sorry I cannot accept calls 📵'
exports.ON_GROUP = ON_GROUP = 'Sorry I cannot be added to groups (for now 😉)'