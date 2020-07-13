
export default class Utils {

    static makeId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    static randRGBA(alpha) {
        const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
        const randomByte = () => randomNumber(0, 255);
        const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2);
        const alphaDude = typeof alpha !== 'undefined' ? alpha : randomPercent()
        return `rgba(${[randomByte(), randomByte(), randomByte(), alphaDude].join(',')})`
    }

    static log(...args) {
        console['log'](JSON.stringify(args));
    }
}