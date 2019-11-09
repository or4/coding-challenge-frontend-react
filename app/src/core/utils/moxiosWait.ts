import moxios from 'moxios';

// not covered by tests because used only in tests
export function moxiosWait() {
    return new Promise(resolve => {
        moxios.wait((...args) => {
            resolve(args);
        });
    });
}
