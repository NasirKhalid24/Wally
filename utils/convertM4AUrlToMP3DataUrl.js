const wa = require('@open-wa/wa-automate');

ffmpeg = require('fluent-ffmpeg');
dURL = require('./dURL');
Crypto = require('crypto');
datauri = require('datauri');
fs = require('fs');
path = require('path');
os = require('os');

module.exports = convertM4AUrlToMP3DataUrl = async function ( url ) {

    let data = await dURL(url);

    const tempFile = path.join(os.tmpdir(), `processing.${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp3`);

    var stream = new(require('stream').Readable)();
    stream.push(Buffer.from(data.replace('data:audio/mp4;base64,',''), 'base64'));
    stream.push(null);

    await new Promise((resolve, reject) => {
        ffmpeg(stream)
            .format('mp3')
            .on('error', function(err, stdout, stderr) {
                console.log('Cannot process video: ' + err.message);
                reject(err)
            })
            .on('end', function(stdout, stderr) {
                resolve(true)
            })
            .save(tempFile);
    });

    const d = await datauri(tempFile);
    await fs.unlinkSync(tempFile)

    return d;
}