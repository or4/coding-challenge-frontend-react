import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { EmptyResults } from '..';
import { Container } from '../style';

describe('EmptyResults', () => {
    it('should correct render', () => {
        const tree = renderer.create(<EmptyResults />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should contain container', () => {
        const wrapper = shallow(<EmptyResults />);

        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should have text', () => {
        const wrapper = shallow(<EmptyResults />);

        expect(wrapper.text()).toEqual('No results');
    });
});
