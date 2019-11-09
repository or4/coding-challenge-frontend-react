import { toSnakeCase, toSnakeCaseString } from '../transformProps';

/* eslint-disable @typescript-eslint/camelcase */

describe('Check transformProps', () => {
    describe('Check toSnakeCase', () => {
        it('should return empty object', () => {
            expect(toSnakeCase({})).toEqual({});
        });

        it('should convert camel case string to snake case', () => {
            expect(toSnakeCaseString('someText')).toBe('some_text');
        });

        it('should return object where keys in snake case', () => {
            expect(toSnakeCase({ someText: true })).toEqual({ some_text: true });
        });

        it('should convert only first object keys', () => {
            expect(toSnakeCase({ someText: true, anotherObject: { anotherText: 'text' } })).toEqual({
                some_text: true,
                another_object: { anotherText: 'text' },
            });
        });
    });
});

/* eslint-enable @typescript-eslint/camelcase */
