import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { TotalIncidents } from '..';
import { Container } from '../style';

describe('TotalIncidents', () => {
    it('should correct render', () => {
        const tree = renderer.create(<TotalIncidents value={4} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should contain container', () => {
        const wrapper = shallow(<TotalIncidents value={1} />);

        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should pass total pages prop', () => {
        const totalPages = 4;
        const wrapper = shallow(<TotalIncidents value={totalPages} />);

        expect(wrapper.text()).toEqual(`Total: ${totalPages}`);
    });

    it('should render when total pages is not defined', () => {
        const wrapper = shallow(<TotalIncidents />);

        expect(wrapper.text()).toEqual(`Total: 0`);
    });

    it('should render when total pages equal zero', () => {
        const wrapper = shallow(<TotalIncidents value={0} />);

        expect(wrapper.text()).toEqual(`Total: 0`);
    });
});
