import { convertFromUnixTimestamp } from './unixTimestamp';

export function dateToString(date: number): string | null {
    const ts = convertFromUnixTimestamp(date);
    if (!ts) {
        return null;
    }

    return new Date(ts).toDateString();
}
