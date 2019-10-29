import reactPackageJson from 'react/package.json';
import reactDOMPackageJson from 'react-dom/package.json';
import reduxPackageJson from 'redux/package.json';
import reduxSagaPackageJson from 'redux-saga/package.json';

describe('Check React version', () => {
    const reactVersion = '16.11.0';

    test(`react version should be ${reactVersion}`, () => {
        expect(reactPackageJson.version).toBe(reactVersion);
    });

    test(`react-dom version should be ${reactVersion}`, () => {
        expect(reactDOMPackageJson.version).toBe(reactVersion);
    });

    test('react and react-dom versions should be equal', () => {
        expect(reactPackageJson.version).toBe(reactDOMPackageJson.version);
    });
});

describe('Check Redux version and related packages', () => {
    const reduxVersion = '4.0.4';
    const reduxSagaVersion = '0.16.0';

    test(`redux version should be ${reduxVersion}`, () => {
        expect(reduxPackageJson.version).toBe(reduxVersion);
    });

    test(`react-dom version should be ${reduxSagaVersion}`, () => {
        expect(reduxSagaPackageJson.version).toBe(reduxSagaVersion);
    });
});
