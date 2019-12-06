import { convertFromUnixTimestamp, convertToUnixTimestamp } from '../unixTimestamp';

describe('convertFromUnixTimestamp', () => {
    it('should exist', () => {
        expect(convertFromUnixTimestamp).toBeTruthy();
    });

    it('should return right value', () => {
        expect(convertFromUnixTimestamp(234)).toBe(234000);
    });

    it('should return right value when arg is zero', () => {
        expect(convertFromUnixTimestamp(0)).toBe(0);
    });

    it('should return zero when arg is a negative value', () => {
        expect(convertFromUnixTimestamp(-123)).toBe(0);
    });

    it('should return zero when type of arg is a string', () => {
        // @ts-ignore
        expect(convertFromUnixTimestamp('test')).toBe(0);
    });

    it('should return right value when arg can be converted to a number ', () => {
        // @ts-ignore
        expect(convertFromUnixTimestamp('4334')).toBe(4334000);
    });

    it('should return zero when arg is NaN', () => {
        // @ts-ignore
        expect(convertFromUnixTimestamp(NaN)).toBe(0);
    });
});

describe('convertToUnixTimestamp', () => {
    it('should exist', () => {
        expect(convertToUnixTimestamp).toBeTruthy();
    });

    it('should return right value', () => {
        expect(convertToUnixTimestamp(234000)).toBe(234);
    });

    it('should return right value when arg is zero', () => {
        expect(convertToUnixTimestamp(0)).toBe(0);
    });

    it('should return zero when arg is a negative value', () => {
        expect(convertToUnixTimestamp(-123)).toBe(0);
    });

    it('should return zero when type of arg is a string', () => {
        // @ts-ignore
        expect(convertToUnixTimestamp('test')).toBe(0);
    });

    it('should return right value when arg can be converted to a number ', () => {
        // @ts-ignore
        expect(convertToUnixTimestamp('4334000')).toBe(4334);
    });

    it('should return zero when arg is NaN', () => {
        // @ts-ignore
        expect(convertToUnixTimestamp(NaN)).toBe(0);
    });
});
