import { toSnakeCase, toSnakeCaseString } from '../transformProps';

describe('Check transformProps', () => {
    describe('Check toSnakeCase', () => {
        it('should return empty object', () => {
            expect(toSnakeCase({})).toEqual({});
        });

        it('should convert camel case string to snake case', () => {
            expect(toSnakeCaseString('someText')).toBe('some_text');
        });

        it('should return object where keys in snake case', () => {
            // eslint-disable-next-line @typescript-eslint/camelcase
            expect(toSnakeCase({ someText: true })).toEqual({ some_text: true });
        });

        it('should convert only first object keys', () => {
            expect(toSnakeCase({ someText: true, anotherObject: { anotherText: 'text' } })).toEqual({
                // eslint-disable-next-line @typescript-eslint/camelcase
                some_text: true,
                // eslint-disable-next-line @typescript-eslint/camelcase
                another_object: { anotherText: 'text' },
            });
        });
    });
});
