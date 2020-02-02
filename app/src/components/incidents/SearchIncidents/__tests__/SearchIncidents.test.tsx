import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { SearchIncidents } from '..';
import { Container } from '../style';
import { noop } from 'redux-saga/utils';

describe('SearchIncidents', () => {
    it('should correct render', () => {
        const text = 'Berlin';
        const tree = renderer.create(<SearchIncidents onChange={noop} text={text} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should contain input', () => {
        const text = 'Berlin';
        const wrapper = shallow(<SearchIncidents onChange={noop} text={text} />);

        expect(wrapper.find(Container)).toHaveLength(1);
    });

    it('should pass text prop', () => {
        const text = 'Berlin';
        const wrapper = shallow(<SearchIncidents onChange={noop} text={text} />);

        expect(wrapper.find('input').props().value).toEqual(text);
    });

    it('should work with not defined text prop', () => {
        const wrapper = shallow(<SearchIncidents onChange={noop} />);

        const text = '';
        expect(wrapper.find('input').props().value).toEqual(text);
    });

    it('should work with onChange handler', () => {
        const text = 'Berlin';
        const onChange = jest.fn();
        const wrapper = mount(<SearchIncidents text={text} onChange={onChange} />);

        const domNode = wrapper.find('input').getDOMNode<HTMLInputElement>();
        domNode.value = text;

        wrapper.find('input').simulate('change');

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(wrapper.find('input').props().value).toEqual(text);
    });
});
