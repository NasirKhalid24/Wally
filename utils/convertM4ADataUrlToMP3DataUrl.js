ffmpeg = require('fluent-ffmpeg'),

module.exports = async function convertM4ADataUrlToMP3DataUrl(file) {

    console.log(file);

    await ffmpeg(file)
            .inputFormat('m4a')
            .format('mp3')
            .on('start', function(commandLine) {
                console.log('Spawned Ffmpeg with command: ' + commandLine);
            })
            .on('stderr', function(stderrLine) {
                console.log('Stderr output: ' + stderrLine);
            })
            .on('error', function(err, stdout, stderr) {
                console.log('Cannot process video: ' + err.message);
            })
            .save('/home/nymarius/Desktop/Whatsapp-Helper/output.mp3');

    //  COPIED FROM OPEN-WA
    // const tempFile = path.join(tmpdir(), `processing.${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
    // var stream = new (require('stream').Readable)();
    // stream.push(Buffer.isBuffer(file) ? file : Buffer.from(file.replace('data:video/mp4;base64,',''), 'base64'));
    // stream.push(null);
    // await new Promise((resolve, reject) => {
    //     ffmpeg(stream)
    //         .inputFormat('mp4')
    //         .on('start', function (cmd) {
    //             console.log('Started ' + cmd);
    //         })
    //         .on('error', function (err) {
    //             console.log('An error occurred: ' + err.message);
    //             reject(err)
    //         })
    //         .on('end', function () {
    //             console.log('Finished encoding');
    //             resolve(true)
    //         })
    //         .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `crop=w='min(min(iw\,ih)\,500)':h='min(min(iw\,ih)\,500)',scale=500:500,setsar=1,fps=${processOptions.fps}`, `-loop`, `${processOptions.loop}`, `-ss`, processOptions.startTime, `-t`, processOptions.endTime, `-preset`, `default`, `-an`, `-vsync`, `0`, `-s`, `512:512`])
    //         .toFormat("webp")
    //         .save(tempFile);
    // })
    // const d = await datauri(tempFile);
    // fs.unlinkSync(tempFile)
    // return d;
  }