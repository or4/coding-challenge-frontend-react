export function toSnakeCaseString(value: string) {
    return value
        .replace(/[\w]([A-Z])/g, function(m) {
            return m[0] + '_' + m[1];
        })
        .toLowerCase();
}

// transofrm only first level of object keys
export function toSnakeCase(obj: { [key: string]: unknown }) {
    const result: { [key: string]: unknown } = {};

    for (const key of Object.keys(obj)) {
        const value = obj[key];

        result[toSnakeCaseString(key)] = value;
    }
    return result;
}
