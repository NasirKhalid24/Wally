const youtubedl = require('youtube-dl');

module.exports = getVideoInfo = async function (url){

    return await new Promise((resolve, reject) => {

        youtubedl.getInfo(url, (err, info) => {  
        
            if (err){
                reject(err);
            }

            let info_ = Object.assign({}, info);
            resolve(info_)
        })

    })
}
