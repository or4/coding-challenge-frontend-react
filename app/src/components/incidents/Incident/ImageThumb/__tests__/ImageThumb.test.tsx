import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import 'jest-styled-components';
import { ImageThumb } from '..';
import { Container, Preview, Image } from '../style';

const url = 'https://test-image-url.com';

describe('ImageThumb', () => {
    it('should render correct with url', () => {
        const tree = renderer.create(<ImageThumb imageUrlThumb={url} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should contain image component', () => {
        const wrapper = shallow(<ImageThumb imageUrlThumb={url} />);

        expect(wrapper.find(Image)).toHaveLength(1);
    });

    it('should contain preview component when url is falsy', () => {
        expect(shallow(<ImageThumb imageUrlThumb={''} />).find(Preview)).toHaveLength(1);
        expect(shallow(<ImageThumb />).find(Preview)).toHaveLength(1);
    });

    it('should have container', () => {
        const wrapper = shallow(<ImageThumb imageUrlThumb={url} />);

        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should have alt', () => {
        const wrapper = shallow(<ImageThumb imageUrlThumb={url} />);

        expect(wrapper.find('img').prop('alt')).toBe('incident');
    });
});

describe('Preview', () => {
    it('should have background image', () => {
        const tree = renderer.create(<Preview />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

describe('Image', () => {
    it('should pass prop with background image', () => {
        const tree = renderer.create(<Image />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
