// Youtube command - Downloads youtube video

const wa = require('@open-wa/wa-automate');
const youtubedl = require('youtube-dl')



module.exports = Youtube = async (client, message, arguments) => {
    
        
        const url = message.body
        console.log(url)
        const aud = true
      
        youtubedl.getInfo(url,function(err, info)  {
        // if (err) throw err
            if(typeof info === 'undefined'){
                client.sendText(message.from, 'Sorry!, this video seems to be invalid. Please ensure its not a private video');      
                }
            else{
                if(info._duration_raw >= 300){
                    client.sendText(message.from, 'Hmm this video seems to be too long, please ensure the video is 5 mins or lower');
                }
                else{
                        client.sendText(message.from, `Video, "${info.title}" found. Processing the video now, please wait`);
                        client.sendFileFromUrl(message.from, info.url);
                        console.log(info._duration_raw)
                    }
                }
            })
        }

        
// INFO LOOKS LIKE THIS
// {
//     upload_date: '20170527',
//     protocol: 'https',
//     extractor: 'youtube',
//     series: null,
//     format: '18 - 288x360 (240p)',
//     format_note: '240p',
//     chapters: null,
//     height: 360,
//     acodec: 'mp4a.40.2',
//     like_count: null,
//     duration: '15', --> DURATION NEEDED TO CHECK LIMIT
//     fulltitle: 'This is how you eat a Big Mac',
//     player_url: null,
//     playlist_index: null,
//     album: null,
//     view_count: 999011,
//     playlist: null,
//     title: 'This is how you eat a Big Mac',
//     _filename: 'This is how you eat a Big Mac-HH6dDxIoeuM.mp4',
//     creator: null,
//     ext: 'mp4',
//     id: 'HH6dDxIoeuM',
//     dislike_count: null,
//     average_rating: 4.9675069,
//     abr: 96,
//     uploader_url: 'http://www.youtube.com/channel/UChu531sc28nWxaDBwRliBkQ',
//     categories: [ 'People & Blogs' ],
//     fps: 30,
//     season_number: null,
//     annotations: null,
//     webpage_url_basename: 'watch',
//     filesize: 997468,
//     display_id: 'HH6dDxIoeuM',
//     asr: 44100,
//     automatic_captions: {},
//     description: 'So funny',
//     tags: null,
//     track: null,
//     requested_subtitles: null,
//     start_time: null,
//     tbr: 530.286,
//     uploader: 'Big Boy',
//     extractor_key: 'Youtube',
//     format_id: '18',
//     episode_number: null,
//     uploader_id: 'UChu531sc28nWxaDBwRliBkQ',
//     subtitles: {},
//     release_year: null,
//     http_headers: {
//       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
//       'Accept-Language': 'en-us,en;q=0.5',
//       'Accept-Encoding': 'gzip, deflate',
//       Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.90 Safari/537.36'
//     },
//     thumbnails: [
//       {
//         url: 'https://i.ytimg.com/vi/HH6dDxIoeuM/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkxJjBpcXNR-asD-GUf4WhZLJbEw',
//         width: 168,
//         resolution: '168x94',
//         id: '0',
//         height: 94
//       },
//       {
//         url: 'https://i.ytimg.com/vi/HH6dDxIoeuM/hqdefault.jpg?sqp=-oaymwEYCMQBEG5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLCbRaHtAcpYlBH_6CzKiifH8vX2Ng',
//         width: 196,
//         resolution: '196x110',
//         id: '1',
//         height: 110
//       },
//       {
//         url: 'https://i.ytimg.com/vi/HH6dDxIoeuM/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAu46dxaL4xMfORnfRnmD8aLK6Wdw',
//         width: 246,
//         resolution: '246x138',
//         id: '2',
//         height: 138
//       },
//       {
//         url: 'https://i.ytimg.com/vi/HH6dDxIoeuM/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDgmebAu__y3sr_CvgaMJ-4a4vaCw',
//         width: 336,
//         resolution: '336x188',
//         id: '3',
//         height: 188
//       }
//     ],
//     license: null,
//     artist: null,
//     url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=18&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=video%2Fmp4&gir=yes&clen=997468&ratebypass=yes&dur=15.232&lmt=1573235241352979&mt=1602541235&fvip=5&fexp=23915654&c=WEB&txp=1311222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgXbCiFM_vwSMpQCAtCxgKBDVroODQ1ZiN48vr3lEJyj8CIDuqxyEd7K19lpHBc3F9ODGdawjsy0uZrhbe77RtVAWW&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D',
//     age_limit: 0,
//     release_date: null,
//     alt_title: null,
//     thumbnail: 'https://i.ytimg.com/vi/HH6dDxIoeuM/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDgmebAu__y3sr_CvgaMJ-4a4vaCw',
//     channel_id: 'UChu531sc28nWxaDBwRliBkQ',
//     is_live: null,
//     width: 288,
//     end_time: null,
//     webpage_url: 'https://www.youtube.com/watch?v=HH6dDxIoeuM',
//     formats: [
//       {
//         asr: 48000,
//         tbr: 45.925,
//         protocol: 'https',
//         format: '249 - audio only (tiny)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=249&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=audio%2Fwebm&gir=yes&clen=84919&dur=15.201&lmt=1573235291791510&mt=1602541235&fvip=5&keepalive=yes&fexp=23915654&c=WEB&txp=1301222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgHK4fOxLM0wFUscoPzpPJktJmq4Z09Qnn7YBakEozescCICiyxRer4Wb7awebXdfo0nFDHq9syDSZguQQhEPJoOrD&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D&ratebypass=yes',
//         vcodec: 'none',
//         format_note: 'tiny',
//         abr: 50,
//         player_url: null,
//         downloader_options: [Object],
//         width: null,
//         ext: 'webm',
//         filesize: 84919,
//         fps: null,
//         format_id: '249',
//         height: null,
//         http_headers: [Object],
//         acodec: 'opus'
//       },
//       {
//         asr: 48000,
//         tbr: 55.83,
//         protocol: 'https',
//         format: '250 - audio only (tiny)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=250&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=audio%2Fwebm&gir=yes&clen=103832&dur=15.201&lmt=1573235291750088&mt=1602541235&fvip=5&keepalive=yes&fexp=23915654&c=WEB&txp=1301222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgXdilnzMDuBM5XkL8aNGcwf_DKE6xnUnBVJj2rv4WEZgCIQDPULDNZJ0hV9zXl76209MNgo-AxqSyAT_RvJbLa_iAYQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D&ratebypass=yes',
//         vcodec: 'none',
//         format_note: 'tiny',
//         abr: 70,
//         player_url: null,
//         downloader_options: [Object],
//         width: null,
//         ext: 'webm',
//         filesize: 103832,
//         fps: null,
//         format_id: '250',
//         height: null,
//         http_headers: [Object],
//         acodec: 'opus'
//       },
//       {
//         asr: 48000,
//         tbr: 99.294,
//         protocol: 'https',
//         format: '251 - audio only (tiny)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=251&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=audio%2Fwebm&gir=yes&clen=186628&dur=15.201&lmt=1573235291694469&mt=1602541235&fvip=5&keepalive=yes&fexp=23915654&c=WEB&txp=1301222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgA3gPnDqseBKgWcWqs81TGk6DnRoOyCLGOeb0uAdY5fQCIH5d5BG3xtimWO106nqJEiXBOXuXBiibnvQwed0oWPP6&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D&ratebypass=yes',
//         vcodec: 'none',
//         format_note: 'tiny',
//         abr: 160,
//         player_url: null,
//         downloader_options: [Object],
//         width: null,
//         ext: 'webm',
//         filesize: 186628,
//         fps: null,
//         format_id: '251',
//         height: null,
//         http_headers: [Object],
//         acodec: 'opus'
//       },
//       {
//         asr: 44100,
//         tbr: 130.099,
//         container: 'm4a_dash',
//         format: '140 - audio only (tiny)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=140&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=audio%2Fmp4&gir=yes&clen=247236&dur=15.232&lmt=1573235467567841&mt=1602541235&fvip=5&keepalive=yes&fexp=23915654&c=WEB&txp=1301222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgLPxAugjdFPltTviWAGjAX0VNIYD3bDtYNpyIC3XJRhcCICI6Pa8j49xqpRsL_0XydWcFBX7xt-bidg1udnwWpHp0&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D&ratebypass=yes',
//         vcodec: 'none',
//         format_note: 'tiny',
//         abr: 128,
//         player_url: null,
//         downloader_options: [Object],
//         width: null,
//         ext: 'm4a',
//         filesize: 247236,
//         fps: null,
//         protocol: 'https',
//         format_id: '140',
//         height: null,
//         http_headers: [Object],
//         acodec: 'mp4a.40.2'
//       },
//       {
//         asr: null,
//         tbr: 55.091,
//         protocol: 'https',
//         format: '160 - 116x144 (144p)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=160&aitags=133%2C134%2C160%2C242%2C243%2C278&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=video%2Fmp4&gir=yes&clen=98819&dur=15.048&lmt=1573235471545308&mt=1602541235&fvip=5&keepalive=yes&fexp=23915654&c=WEB&txp=1306222&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgQKNtyHBRB8skY3ixJcQhywaqHAM5OtTiepTIsLuaQZQCIF2ZWfaF9MakL1XZ9ah6bGwPvQfSrC0_1306ijfkF5hR&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D&ratebypass=yes',
//         vcodec: 'avc1.4d400b',
//         format_note: '144p',
//         height: 144,
//         downloader_options: [Object],
//         width: 116,
//         ext: 'mp4',
//         filesize: 98819,
//         fps: 30,
//         format_id: '160',
//         player_url: null,
//         http_headers: [Object],
//         acodec: 'none'
//       },
//       {
//         asr: null,
//         tbr: 57.107,
//         container: 'webm',
//         format: '278 - 116x144 (144p)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=278&aitags=133%2C134%2C160%2C242%2C243%2C278&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=video%2Fwebm&gir=yes&clen=105392&dur=15.048&lmt=1573235471150158&mt=1602541235&fvip=5&keepalive=yes&fexp=23915654&c=WEB&txp=1306222&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAJRPxuD0BYtIEQNTVddV35zxpvxd79lytTahmxhAny8_AiEAv8XR3OYuZA9Qh3WhkLATsAT70yQTkuQw_daQPbLk9-A%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D&ratebypass=yes',
//         vcodec: 'vp9',
//         format_note: '144p',
//         player_url: null,
//         downloader_options: [Object],
//         width: 116,
//         ext: 'webm',
//         filesize: 105392,
//         fps: 30,
//         protocol: 'https',
//         format_id: '278',
//         height: 144,
//         http_headers: [Object],
//         acodec: 'none'
//       },
//       {
//         asr: null,
//         tbr: 112.851,
//         protocol: 'https',
//         format: '133 - 192x240 (240p)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=133&aitags=133%2C134%2C160%2C242%2C243%2C278&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=video%2Fmp4&gir=yes&clen=208453&dur=15.048&lmt=1573235471543977&mt=1602541235&fvip=5&keepalive=yes&fexp=23915654&c=WEB&txp=1306222&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAImO9-YPK1isAv5cYPj4e7Btsk_2WNzjFsG0_vS-PQrZAiEAigV_K9I_xh0luGVssCgvCQoqMZEPSZ5kVPwVS4uW6NI%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D&ratebypass=yes',
//         vcodec: 'avc1.4d400c',
//         format_note: '240p',
//         height: 240,
//         downloader_options: [Object],
//         width: 192,
//         ext: 'mp4',
//         filesize: 208453,
//         fps: 30,
//         format_id: '133',
//         player_url: null,
//         http_headers: [Object],
//         acodec: 'none'
//       },
//       {
//         asr: null,
//         tbr: 121.868,
//         protocol: 'https',
//         format: '242 - 192x240 (240p)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=242&aitags=133%2C134%2C160%2C242%2C243%2C278&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=video%2Fwebm&gir=yes&clen=221249&dur=15.048&lmt=1573235471157232&mt=1602541235&fvip=5&keepalive=yes&fexp=23915654&c=WEB&txp=1306222&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgE4XHXuPsy45WBX3RQEk8a24ktih-yIqCI77ORbZaAFgCIQDqtS6wsRt61YEVvf6ZE8_eKuG8VfRKiEG5t_hg2-vxUw%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D&ratebypass=yes',
//         vcodec: 'vp9',
//         format_note: '240p',
//         height: 240,
//         downloader_options: [Object],
//         width: 192,
//         ext: 'webm',
//         filesize: 221249,
//         fps: 30,
//         format_id: '242',
//         player_url: null,
//         http_headers: [Object],
//         acodec: 'none'
//       },
//       {
//         asr: null,
//         tbr: 222.02,
//         protocol: 'https',
//         format: '243 - 288x360 (240p)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=243&aitags=133%2C134%2C160%2C242%2C243%2C278&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=video%2Fwebm&gir=yes&clen=400639&dur=15.048&lmt=1573235471157818&mt=1602541235&fvip=5&keepalive=yes&fexp=23915654&c=WEB&txp=1306222&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgKiViEUW90bRXQ0mdcjU8I34iaIqhD5g67BqaUUClGu8CIQCVBlxd07wOI1LivPwC4bI7ccehJDrnqWNXjv_3X7iYXg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D&ratebypass=yes',
//         vcodec: 'vp9',
//         format_note: '240p',
//         height: 360,
//         downloader_options: [Object],
//         width: 288,
//         ext: 'webm',
//         filesize: 400639,
//         fps: 30,
//         format_id: '243',
//         player_url: null,
//         http_headers: [Object],
//         acodec: 'none'
//       },
//       {
//         asr: null,
//         tbr: 255.386,
//         protocol: 'https',
//         format: '134 - 288x360 (240p)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=134&aitags=133%2C134%2C160%2C242%2C243%2C278&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=video%2Fmp4&gir=yes&clen=464318&dur=15.048&lmt=1573235471552749&mt=1602541235&fvip=5&keepalive=yes&fexp=23915654&c=WEB&txp=1306222&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgOxWGt47qg_T8N8lLhoIg6R76p12mW-X2AnDgyfdcHc0CIQCfXN6WI3Zd--y22jVHoD-wZOPaDWTJxe3EeoOj8mzA6A%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D&ratebypass=yes',
//         vcodec: 'avc1.4d4015',
//         format_note: '240p',
//         height: 360,
//         downloader_options: [Object],
//         width: 288,
//         ext: 'mp4',
//         filesize: 464318,
//         fps: 30,
//         format_id: '134',
//         player_url: null,
//         http_headers: [Object],
//         acodec: 'none'
//       },
//       {
//         asr: 44100,
//         tbr: 530.286,
//         protocol: 'https',
//         format: '18 - 288x360 (240p)',
//         url: 'https://r5---sn-xupn5a5u5x-4wge6.googlevideo.com/videoplayback?expire=1602562939&ei=G9eEX46mG8SWxwLk9JWoBw&ip=92.98.9.7&id=o-AAwuO2G8o8nOj9SRcjXfu00gfsdzs8lSFCfILs5gk7D4&itag=18&source=youtube&requiressl=yes&mh=js&mm=31%2C29&mn=sn-xupn5a5u5x-4wge6%2Csn-xupn5a5u-4wges&ms=au%2Crdu&mv=m&mvi=5&pl=23&nh=%2CEAE&initcwndbps=733750&vprv=1&mime=video%2Fmp4&gir=yes&clen=997468&ratebypass=yes&dur=15.232&lmt=1573235241352979&mt=1602541235&fvip=5&fexp=23915654&c=WEB&txp=1311222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgXbCiFM_vwSMpQCAtCxgKBDVroODQ1ZiN48vr3lEJyj8CIDuqxyEd7K19lpHBc3F9ODGdawjsy0uZrhbe77RtVAWW&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cnh%2Cinitcwndbps&lsig=AG3C_xAwRQIgCgm1m_iUJU6fOqb_OMhALYDqFkxH-Gp1onzwhxiqUXUCIQC3-0orWPC50XnmQ5tcorrMUE29BuMwyp9nMzuaV1jneA%3D%3D',
//         vcodec: 'avc1.42001E',
//         format_note: '240p',
//         ext: 'mp4',
//         player_url: null,
//         width: 288,
//         abr: 96,
//         filesize: 997468,
//         fps: 30,
//         format_id: '18',
//         height: 360,
//         http_headers: [Object],
//         acodec: 'mp4a.40.2'
//       }
//     ],
//     channel_url: 'http://www.youtube.com/channel/UChu531sc28nWxaDBwRliBkQ',
//     vcodec: 'avc1.42001E',
//     _duration_raw: 15,
//     _duration_hms: '00:00:15'
//   }