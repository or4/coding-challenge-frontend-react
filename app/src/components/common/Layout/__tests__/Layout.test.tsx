import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Layout } from '..';

describe('Layout', () => {
    it('should correct render', () => {
        const tree = renderer.create(<Layout />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should apply children as component', () => {
        const Children = () => <div>There are some children</div>;
        const wrapper = shallow(<Layout>{<Children />}</Layout>);

        expect(wrapper.find(Children)).toHaveLength(1);
    });

    it('should apply children as jsx prop', () => {
        const children = <div className="test-children">There are some children</div>;
        const wrapper = shallow(<Layout>{children}</Layout>);

        expect(wrapper.find('.test-children')).toHaveLength(1);
    });
});
