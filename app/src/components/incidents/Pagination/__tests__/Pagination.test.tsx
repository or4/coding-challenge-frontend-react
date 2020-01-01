import React from 'react';
import { mount } from 'enzyme';

import { Pagination } from '..';
import { Button } from '../style';

describe('Pagination', () => {
    it('should render one button with text 1 when current page is 1, total pages is 1', () => {
        const wrapper = mount(<Pagination currentPage={1} totalPages={1} />);
        const button = wrapper.find(Button);

        expect(button).toHaveLength(1);
        expect(button.text()).toBe('1');
    });

    it('should have next button when current page < total pages', () => {
        const wrapper = mount(<Pagination currentPage={1} totalPages={2} />);
        const buttons = wrapper.find(Button);

        expect(buttons.at(buttons.length - 1).text()).toBe('Next');
    });

    it('should not have next button when current page = total pages', () => {
        const wrapper = mount(<Pagination currentPage={2} totalPages={2} />);
        const buttons = wrapper.find(Button);

        expect(buttons.at(buttons.length - 1).text()).toBe('2');
    });

    it('should have prev button when current page > 1', () => {
        const wrapper = mount(<Pagination currentPage={2} totalPages={2} />);
        const buttons = wrapper.find(Button);

        expect(buttons.at(0).text()).toBe('Prev');
    });

    it('should have not prev button when current page = 1', () => {
        const wrapper = mount(<Pagination currentPage={1} totalPages={2} />);
        const buttons = wrapper.find(Button);

        expect(buttons.at(0).text()).toBe('1');
    });

    it('should have buttons 1, 2 and next when current page 1, total pages is 2 ', () => {
        const wrapper = mount(<Pagination currentPage={1} totalPages={2} />);
        const buttons = wrapper.find(Button);

        expect(buttons).toHaveLength(3);
        expect(buttons.at(0).text()).toBe('1');
        expect(buttons.at(1).text()).toBe('2');
        expect(buttons.at(2).text()).toBe('Next');
    });

    it('should have buttons prev and 1, 2 when current page 2, total pages is 2 ', () => {
        const wrapper = mount(<Pagination currentPage={2} totalPages={2} />);
        const buttons = wrapper.find(Button);

        expect(buttons).toHaveLength(3);
        expect(buttons.at(0).text()).toBe('Prev');
        expect(buttons.at(1).text()).toBe('1');
        expect(buttons.at(2).text()).toBe('2');
    });

    it('can not click on current button ', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Pagination currentPage={1} totalPages={1} onChange={onChange} />);
        const button = wrapper.find(Button);

        expect(button.text()).toBe('1');
        button.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(0);
    });

    it('should change page when click on next button', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Pagination currentPage={1} totalPages={2} onChange={onChange} />);
        const buttons = wrapper.find(Button);
        const button = buttons.at(buttons.length - 1);

        expect(button.text()).toBe('Next');
        button.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toBeCalledWith(2);
    });

    it('should change page when click on prev button', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Pagination currentPage={2} totalPages={2} onChange={onChange} />);
        const buttons = wrapper.find(Button);
        const button = buttons.at(0);

        expect(button.text()).toBe('Prev');
        button.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toBeCalledWith(1);
    });

    it('should change page when click on number button', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Pagination currentPage={1} totalPages={2} onChange={onChange} />);
        const buttons = wrapper.find(Button);
        const button = buttons.at(buttons.length - 2);

        expect(button.text()).toBe('2');
        button.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toBeCalledWith(2);
    });
});
