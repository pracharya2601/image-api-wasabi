const crypto = require('crypto');
const { promisify } = require('util');
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);
const salt = iv.toString("hex")

const scrypt = promisify(crypto.scrypt);

module.exports.encrypt = (data) => {
    const textFormat = JSON.stringify(data);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(textFormat), cipher.final()]);
    return `${iv.toString('hex')}-${encrypted.toString('hex')}`;
}

module.exports.decrypt = (hashedData) => {
    const [iv, content] = hashedData.split('-');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return JSON.parse(decrypted.toString());
}

module.exports.passHash = async (password) => {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

module.exports.verifyHash = async (password, hash) => {
    const [salt, key] = hash.split(":")
    const keyBuffer = Buffer.from(key, 'hex')
    const derivedKey = await scrypt(password, salt, 64)
    return crypto.timingSafeEqual(keyBuffer, derivedKey)
}