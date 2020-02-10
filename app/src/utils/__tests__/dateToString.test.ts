import { dateToString, addDays } from 'utils/dateFormat';

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

describe('addDays', () => {
    it('should add one day', () => {
        const date = new Date(0);
        expect(addDays(date, 1).toDateString()).toBe('Fri Jan 02 1970');
    });

    it('should add one day without secod argument', () => {
        const date = new Date(0);
        expect(addDays(date).toDateString()).toBe('Fri Jan 02 1970');
    });

    it('should now work without arguments', () => {
        // @ts-ignore
        expect(addDays().toDateString()).toBe('Invalid Date');
    });
});
