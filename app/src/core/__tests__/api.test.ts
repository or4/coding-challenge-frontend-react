import { config, api, requestInterceptor } from 'core/api';

describe('Check api', () => {
    it('should equal config', () => {
        expect(config).toEqual({
            baseURL: 'https://bikewise.org:443/api/v2',
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
        const req = { params: { caseOptions: 'text' } };
        // eslint-disable-next-line @typescript-eslint/camelcase
        const expected = { params: { case_options: 'text' } };

        expect(requestInterceptor(req)).toEqual(expected);
    });

    it('should return converted request params with many options', () => {
        const req = { params: { caseOptions: 'text', text: 'text' } };
        // eslint-disable-next-line @typescript-eslint/camelcase
        const expected = { params: { case_options: 'text', text: 'text' } };

        expect(requestInterceptor(req)).toEqual(expected);
    });

    it('should not convert inner objects', () => {
        const req = { params: { inner: { caseOptions: 'text' } } };
        // eslint-disable-next-line @typescript-eslint/camelcase
        const expected = { params: { inner: { caseOptions: 'text' } } };

        expect(requestInterceptor(req)).toEqual(expected);
    });
});
