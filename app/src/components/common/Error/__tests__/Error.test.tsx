import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Error } from '..';
import { Container } from '../style';

describe('Error', () => {
    it('should correct render', () => {
        const tree = renderer.create(<Error />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should contain container', () => {
        const wrapper = shallow(<Error />);

        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should have text', () => {
        const wrapper = shallow(<Error />);

        expect(wrapper.text()).toEqual('Ooops, something went wrong');
    });
});
