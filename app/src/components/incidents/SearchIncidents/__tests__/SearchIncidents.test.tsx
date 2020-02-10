import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { SearchIncidents, IProps } from '..';
import { noop } from 'redux-saga/utils';

describe('SearchIncidents', () => {
    let props: IProps;

    beforeEach(() => {
        props = {
            onChangeQuery: noop,
            onChangeFrom: noop,
            onChangeTo: noop,
        };
    });
    describe('common', () => {
        it('should correct render', () => {
            const text = 'Berlin';
            const tree = renderer.create(<SearchIncidents {...props} text={text} />).toJSON();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Query', () => {
        it('should exist', () => {
            const wrapper = shallow(<SearchIncidents {...props} />);

            expect(wrapper.find('[data-test-id="search-incidents__query"]')).toHaveLength(1);
        });

        it('should pass text prop', () => {
            const text = 'Berlin';
            const wrapper = shallow(<SearchIncidents {...props} text={text} />);

            expect(wrapper.find('[data-test-id="search-incidents__query"]').props().value).toEqual(text);
        });

        it('should equal empty string with not defined text prop', () => {
            const wrapper = shallow(<SearchIncidents {...props} />);

            const text = '';
            expect(wrapper.find('[data-test-id="search-incidents__query"]').props().value).toEqual(text);
        });

        it('should work with onChange handler', () => {
            const onChange = jest.fn();
            const wrapper = shallow(<SearchIncidents {...props} onChangeQuery={onChange} />);

            wrapper.find('[data-test-id="search-incidents__query"]').simulate('change', { target: 'test' });
            expect(onChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('Date from', () => {
        it('should exist', () => {
            const wrapper = shallow(<SearchIncidents {...props} />);

            expect(wrapper.find('[data-test-id="search-incidents__date-from"]')).toHaveLength(1);
        });

        it('should pass date from prop', () => {
            const date = new Date(1581186608771);
            const wrapper = mount(<SearchIncidents {...props} from={date} />);
            const input = wrapper.find('[data-test-id="search-incidents__date-from"]').find('input');

            expect(input.props().value).toEqual('02/09/2020');
        });

        it('should equal empty string with not defined date from prop', () => {
            const wrapper = mount(<SearchIncidents {...props} />);

            const input = wrapper.find('[data-test-id="search-incidents__date-from"]').find('input');

            expect(input.props().value).toEqual('');
        });

        it('should equal empty string when date from prop is null', () => {
            const wrapper = mount(<SearchIncidents {...props} from={null} />);

            const input = wrapper.find('[data-test-id="search-incidents__date-from"]').find('input');

            expect(input.props().value).toEqual('');
        });

        it('should have placeholder', () => {
            const wrapper = mount(<SearchIncidents {...props} from={null} />);

            const input = wrapper.find('[data-test-id="search-incidents__date-from"]').find('input');

            expect(input.props().placeholder).toEqual('from');
        });

        it.skip('should work with onChange handler', () => {
            const onChangeFrom = jest.fn();
            const wrapper = mount(<SearchIncidents {...props} onChangeFrom={onChangeFrom} />);
            const input = wrapper.find('[data-test-id="search-incidents__date-from"]').find('input');

            input.simulate('change', { target: '02/09/2020' });
            expect(onChangeFrom).toHaveBeenCalledTimes(1);
        });
    });

    describe('Date to', () => {
        it('should exist', () => {
            const wrapper = shallow(<SearchIncidents {...props} />);

            expect(wrapper.find('[data-test-id="search-incidents__date-to"]')).toHaveLength(1);
        });

        it('should pass date to prop', () => {
            const date = new Date(1581186608771);
            const wrapper = mount(<SearchIncidents {...props} to={date} />);
            const input = wrapper.find('[data-test-id="search-incidents__date-to"]').find('input');

            expect(input.props().value).toEqual('02/09/2020');
        });

        it('should equal empty string with not defined date to prop', () => {
            const wrapper = mount(<SearchIncidents {...props} />);

            const input = wrapper.find('[data-test-id="search-incidents__date-to"]').find('input');

            expect(input.props().value).toEqual('');
        });

        it('should equal empty string when date to prop is null', () => {
            const wrapper = mount(<SearchIncidents {...props} to={null} />);

            const input = wrapper.find('[data-test-id="search-incidents__date-to"]').find('input');

            expect(input.props().value).toEqual('');
        });

        it('should have placeholder', () => {
            const wrapper = mount(<SearchIncidents {...props} to={null} />);

            const input = wrapper.find('[data-test-id="search-incidents__date-to"]').find('input');

            expect(input.props().placeholder).toEqual('to');
        });

        it.skip('should work with onChange handler', () => {
            const onChangeFrom = jest.fn();
            const wrapper = mount(<SearchIncidents {...props} onChangeFrom={onChangeFrom} />);
            const input = wrapper.find('[data-test-id="search-incidents__date-to"]').find('input');

            input.simulate('change', { target: '02/09/2020' });
            expect(onChangeFrom).toHaveBeenCalledTimes(1);
        });
    });
});
