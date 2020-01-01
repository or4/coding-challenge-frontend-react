import React from 'react';
import { shallow, mount } from 'enzyme';
import { noop } from 'lodash';

import { PageButton } from '..';
import { Button } from '../../Button';

describe('PageButton', () => {
    const defaultProps = {
        onChange: noop,
        text: 'Next',
        page: 1,
    };

    it('should have button', () => {
        const wrapper = shallow(<PageButton {...defaultProps} />);

        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it('should have expected text', () => {
        const wrapper = mount(<PageButton {...defaultProps} />);

        expect(wrapper.find(Button).text()).toEqual('Next');
    });

    it('should call onChange with right page', () => {
        const props = { ...defaultProps, onChange: jest.fn() };
        const wrapper = shallow(<PageButton {...props} />);

        wrapper.find(Button).simulate('click');

        expect(props.onChange).toHaveBeenCalledTimes(1);
    });

    it('should have text of number when text is not defined', () => {
        const props = { ...defaultProps, text: undefined };
        const wrapper = mount(<PageButton {...props} />);

        expect(wrapper.find(Button).text()).toEqual('1');
    });

    it('should pass className prop', () => {
        const wrapper = shallow(<PageButton {...defaultProps} className="test-class" />);

        expect(wrapper.find('.test-class')).toHaveLength(1);
    });

    it('should not call onChange when page is current', () => {
        const props = { ...defaultProps, onChange: jest.fn(), current: true };
        const wrapper = mount(<PageButton {...props} />);

        wrapper.find(Button).simulate('click');

        expect(props.onChange).toHaveBeenCalledTimes(0);
    });
});
