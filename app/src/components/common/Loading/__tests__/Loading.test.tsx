import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Loading } from '..';
import { Container } from '../style';

describe('Loading', () => {
    it('should correct render', () => {
        const tree = renderer.create(<Loading />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should contain container', () => {
        const wrapper = shallow(<Loading />);

        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should have text', () => {
        const wrapper = shallow(<Loading />);

        expect(wrapper.text()).toEqual('Loading ...');
    });
});
