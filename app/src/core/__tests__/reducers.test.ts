import { store } from '../store';

describe('Check redux state', () => {
    it('should return empty state', () => {
        expect(store.getState()).toEqual({});
    });
});
