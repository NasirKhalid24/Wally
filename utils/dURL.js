module.exports = async function getDUrl(url, optionsOverride){
    try {
        const res = await axios({
            method:"get",
            url,
            headers: {
            'DNT':1,
            'Upgrade-Insecure-Requests':1
            },
            ...optionsOverride,
            responseType: 'arraybuffer'
        });
        const dUrl = `data:${res.headers['content-type']};base64,${Buffer.from(res.data, 'binary').toString('base64')}`;
        return dUrl;
        // return Buffer.from(response.data, 'binary').toString('base64')
    } catch (error) {
        console.log("TCL: getDUrl -> error", error)
    }
}