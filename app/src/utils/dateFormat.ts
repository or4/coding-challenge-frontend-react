import { convertFromUnixTimestamp } from './unixTimestamp';

export function dateToString(date: number): string | null {
    const ts = convertFromUnixTimestamp(date);
    if (!ts) {
        return null;
    }

    return new Date(ts).toDateString();
}

export function addDays(date: Date, days = 1) {
    const result = new Date(date);

    result.setDate(result.getDate() + days);

    return result;
}
