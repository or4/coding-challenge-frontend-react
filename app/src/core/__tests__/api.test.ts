import { config, api, requestInterceptor } from 'core/api';

describe('Check api', () => {
    it('should equal config', () => {
        expect(config).toEqual({
            baseURL: 'https://bikewise.org:443/api/v2/',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: 'Bearer none',
            },
        });
    });

    it('shoud return api object', () => {
        expect(api).toBeInstanceOf(Object);
    });

    it('should return converted request params', () => {
        const req = {
            params: { someOptions: 'text' },
        };
        const expected = {
            // eslint-disable-next-line @typescript-eslint/camelcase
            params: { some_options: 'text' },
        };
        expect(requestInterceptor(req)).toEqual(expected);
    });
});
