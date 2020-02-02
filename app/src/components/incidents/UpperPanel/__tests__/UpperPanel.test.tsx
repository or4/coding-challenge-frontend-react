import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { UpperPanel } from '..';
import { Container } from '../style';
import 'jest-styled-components';

describe('UpperPanel', () => {
    it('should correct render', () => {
        const tree = renderer.create(<UpperPanel />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should contain container', () => {
        const wrapper = shallow(<UpperPanel />);

        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should pass children', () => {
        const children = [<div key={1}>item 1</div>, <div key={2}>item 2</div>];
        const wrapper = shallow(<UpperPanel>{children}</UpperPanel>);

        expect(wrapper.contains(children)).toBeTruthy();
    });
});
