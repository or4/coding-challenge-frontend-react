import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Button } from '..';
import { Container } from '../style';

describe('Button', () => {
    it('should match snapshot when canClick is true', () => {
        const tree = renderer.create(<Button canClick={true} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should match snapshot when canClick is false', () => {
        const tree = renderer.create(<Button canClick={false} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should contain container', () => {
        const wrapper = shallow(<Button canClick={true} />);

        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should pass text prop', () => {
        const wrapper = shallow(<Button canClick={true}>{'Next'}</Button>);

        expect(wrapper.text()).toEqual('Next');
    });

    it('should work with onClick prop', () => {
        const fn = jest.fn();
        const wrapper = shallow(
            <Button canClick={true} onClick={fn}>
                {'Next'}
            </Button>
        );
        wrapper.simulate('click');

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should pass other props', () => {
        const className = 'btn-primary';
        const style = { backgroundColor: 'green' };
        const componennt = (
            // @ts-ignore
            <Button canClick={true} className={className} style={style} data-test-id="next-button">
                {'Next'}
            </Button>
        );
        const wrapper = shallow(componennt);

        expect(wrapper.prop('className')).toEqual(className);
        expect(wrapper.prop('style')).toEqual(style);
        expect(wrapper.prop('data-test-id')).toEqual('next-button');
    });

    it('should not can click when flag canClick is false', () => {
        const fn = jest.fn();
        const wrapper = shallow(
            <Button canClick={false} onClick={fn}>
                {'1'}
            </Button>
        );
        wrapper.simulate('click');

        expect(fn).toHaveBeenCalledTimes(0);
    });
});
