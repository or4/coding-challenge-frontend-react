import { toSnakeCase, toSnakeCaseString, toCamelCase, toCamelCaseString } from '../transformProps';

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

    describe('Check toCamelCase', () => {
        it('should return empty object', () => {
            expect(toCamelCase({})).toEqual({});
        });

        it('should convert string from snake case to camel case', () => {
            expect(toCamelCaseString('some_text')).toBe('someText');
        });

        it('should convert keys of first level', () => {
            const data = {
                first_level: true,
            };
            const expected = {
                firstLevel: true,
            };

            expect(toCamelCase(data)).toEqual(expected);
        });

        it('should convert keys of second level inner objects', () => {
            const data = {
                first_level: true,
                inner_object: {
                    secod_level: true,
                },
            };
            const expected = {
                firstLevel: true,
                innerObject: {
                    secodLevel: true,
                },
            };

            expect(toCamelCase(data)).toEqual(expected);
        });

        it('should convert keys of third level inner objects', () => {
            const data = {
                first_level: true,
                inner_object: {
                    secod_level: true,
                    inner_object: {
                        third_level: true,
                    },
                },
            };
            const expected = {
                firstLevel: true,
                innerObject: {
                    secodLevel: true,
                    innerObject: {
                        thirdLevel: true,
                    },
                },
            };

            expect(toCamelCase(data)).toEqual(expected);
        });

        it('should convert type of array right', () => {
            const data = {
                array: [{ img_src: true }],
            };
            const expected = {
                array: [{ imgSrc: true }],
            };

            expect(toCamelCase(data)).toEqual(expected);
        });
    });
});

/* eslint-enable @typescript-eslint/camelcase */
