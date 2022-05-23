import crypto, { BinaryLike, CipherCCMTypes, CipherKey } from 'crypto';
import { promisify } from 'util';

//CipherCCMTypes
const algorithm = process.env.ALGOTITHM_CRYPTO as CipherCCMTypes;
const secretKey = process.env.SECRET_KEY_CRYPTO as CipherKey;

const iv = crypto.randomBytes(16);
const salt = iv.toString("hex");

const scrypt = promisify(crypto.scrypt);

export const encrypt = (data: any): string => {
    const textFormat = JSON.stringify(data);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(textFormat), cipher.final()]);
    return `${iv.toString('hex')}-${encrypted.toString('hex')}`;
}

export const decrypt =<T>(hashedData: string): T => {
    const [iv, content] = hashedData.split('-');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return JSON.parse(decrypted.toString());
}

export const passHash = async (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

export const verifyHash =async (password:string, hash: string): Promise<boolean> => {
    const [salt, key] = hash.split(":")
    const keyBuffer = Buffer.from(key, 'hex')
    const derivedKey = await scrypt(password, salt, 64) as NodeJS.ArrayBufferView;
    return crypto.timingSafeEqual(keyBuffer, derivedKey)
}
