export function convertFromUnixTimestamp(unix: number): number {
    return unix < 0 || isNaN(unix) ? 0 : Number(unix + '000');
}

export function convertToUnixTimestamp(time: number): number {
    return time < 0 || isNaN(time) ? 0 : Number(String(time).slice(0, -3));
}
