import { dateToString } from 'utils/dateFormat';

describe('dateToString', () => {
    it('should return correct format date', () => {
        expect(dateToString(1571918301)).toBe('Thu Oct 24 2019');
    });

    it('should return null when arg is 0', () => {
        expect(dateToString(0)).toBe(null);
    });

    it('should return null when arg is not a valid number', () => {
        expect(dateToString(NaN)).toBe(null);
        // @ts-ignore
        expect(dateToString('343af2sf')).toBe(null);
        // @ts-ignore
        expect(dateToString(true)).toBe(null);
    });
});
