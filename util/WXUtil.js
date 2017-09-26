'user static'

const APP_ID = 'wx12e0d9958c5b3bb6';
const SECRET = '30356ac2c536e99bbfe1ad2cd2a40963';
var https = require("https");
var iconv = require("iconv-lite");
var crypto = require('crypto');


function getSessionKey(Code, successRes) {
    let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APP_ID + '&secret=' + SECRET + '&js_code=' + Code + '&grant_type=authorization_code';
    https.get(url, function (res) {
        let datas = [];
        let size = 0;
        res.on('data', function (data) {
            datas.push(data);
            size += data.length;
            //process.stdout.write(data);  
        });
        res.on("end", function () {
            let buff = Buffer.concat(datas, size);
            let result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring  
            let sessionKey = JSON.parse(result).session_key;
            return typeof successRes == "function" && successRes(sessionKey);
        });
    }).on("error", function (err) {
        Logger.error(err.stack)
        callback.apply(null);
    });
}


function decryptData(encryptedData, iv) {
    // base64 decode
    var sessionKey = new Buffer(this.sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
        // 解密
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        var decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')

        decoded = JSON.parse(decoded)

    } catch (err) {
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer')
    }

    return decoded
}

module.exports = {
    getSessionKey,
    decryptData
}