import { create } from 'apisauce';

import { toSnakeCase } from './utils/transformProps';

const API_END_POINT = 'https://bikewise.org:443/api/v2';

export const config = {
    baseURL: API_END_POINT,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer none',
    },
};

export const api = create(config);

// @ts-ignore
export const requestInterceptor = function(request) {
    request.params = toSnakeCase(request.params);

    return request;
};

api.axiosInstance.interceptors.request.use(requestInterceptor);
