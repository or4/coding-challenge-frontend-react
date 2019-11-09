/* eslint-disable @typescript-eslint/camelcase */
import { config, api, requestInterceptor, responseInterceptor } from 'core/api';

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

    describe('requestInterceptor, convert params keys from camel case to snake case', () => {
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

    describe('responseInterceptor, convert response data keys from snake case to camel case', () => {
        it('should convert response data first level object keys', () => {
            const res = { data: { image_url: 'src..' } };
            const expected = { data: { imageUrl: 'src..' } };

            expect(responseInterceptor(res)).toEqual(expected);
        });

        it('should convert response data second level object keys', () => {
            const res = { data: { media: { image_url_thumb: 'src..' } } };
            const expected = { data: { media: { imageUrlThumb: 'src..' } } };

            expect(responseInterceptor(res)).toEqual(expected);
        });

        it('should convert response data third level object keys', () => {
            const res = {
                data: { media: { inner: { image_options: {} } } },
            };
            const expected = {
                data: { media: { inner: { imageOptions: {} } } },
            };

            expect(responseInterceptor(res)).toEqual(expected);
        });
    });
});

/* eslint-enable @typescript-eslint/camelcase */
