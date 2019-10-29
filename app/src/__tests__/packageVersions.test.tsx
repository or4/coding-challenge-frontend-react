import reactPackageJson from 'react/package.json';
import reactDOMPackageJson from 'react-dom/package.json';

describe('Check React version', () => {
    const currentReactVersion = '16.11.0';

    test(`react version should be ${currentReactVersion}`, () => {
        expect(reactPackageJson.version).toBe(currentReactVersion);
    });

    test(`react-dom version should be ${currentReactVersion}`, () => {
        expect(reactDOMPackageJson.version).toBe(currentReactVersion);
    });

    test('react and react-dom versions should be equal', () => {
        expect(reactPackageJson.version).toBe(reactDOMPackageJson.version);
    });
});
