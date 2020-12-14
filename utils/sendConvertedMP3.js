const convertM4AUrlToMP3DataUrl = require('../utils/convertM4AUrlToMP3DataUrl');

module.exports = sendConvertedMP3 = async function ( url , client, from, name)  {
    let d = await convertM4AUrlToMP3DataUrl(url);
    
    await client.sendFile(from, d, name);
}