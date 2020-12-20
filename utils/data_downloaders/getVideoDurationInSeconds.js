const ffmpeg = require('fluent-ffmpeg');

module.exports = getVideoDurationInSeconds = async function (url){

    return await new Promise((resolve, reject) => {

        ffmpeg.ffprobe(url, function(err, metadata) {
            
            resolve(metadata.format.duration);

        });

    })
}




