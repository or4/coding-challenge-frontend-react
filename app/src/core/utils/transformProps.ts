import { isObject } from 'lodash';

export function toSnakeCaseString(value: string) {
    return value
        .replace(/[\w]([A-Z])/g, function(m) {
            return m[0] + '_' + m[1];
        })
        .toLowerCase();
}

// transofrm only first level of object keys
export function toSnakeCase(obj: Record<string, unknown>) {
    const result: Record<string, unknown> = {};

    for (const key of Object.keys(obj)) {
        const value = obj[key];

        result[toSnakeCaseString(key)] = value;
    }
    return result;
}

export function toCamelCaseString(value: string) {
    return value.replace(/(_\w)/g, function(m) {
        return m[1].toUpperCase();
    });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function toCamelCase(obj: Record<string, any>) {
    const result: Record<string, any> = {};

    for (const key of Object.keys(obj)) {
        let value = isObject(obj[key]) ? toCamelCase(obj[key]) : obj[key];

        result[toCamelCaseString(key)] = value;
    }

    return result;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
