export class Validators {
    static require(value = '') {
        return value && value.trim();
    }

    static minLength(length) {
        return value => {
            return value.length >= length;
        }
    }
}