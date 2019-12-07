import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Header } from '..';
import { Container, Logo, TextWrapper, Title, Description } from '../style';

describe('Header', () => {
    it('should correct render', () => {
        const tree = renderer.create(<Header />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    describe('Container', () => {
        it('should correct render', () => {
            const tree = renderer.create(<Container />).toJSON();

            expect(tree).toMatchSnapshot();
        });

        it('should exist', () => {
            const wrapper = shallow(<Header />);

            expect(wrapper.find(Container)).toHaveLength(1);
        });
    });

    describe('Logo', () => {
        it('should correct render', () => {
            const tree = renderer.create(<Logo />).toJSON();

            expect(tree).toMatchSnapshot();
        });

        it('should exist', () => {
            const wrapper = shallow(<Header />);

            expect(wrapper.find(Logo)).toHaveLength(1);
        });

        it('should have attribute src', () => {
            const wrapper = shallow(<Header />);

            expect(wrapper.find(Logo).prop('src')).toEqual('logo.png');
        });
    });

    describe('TextWrapper', () => {
        it('should correct render', () => {
            const tree = renderer.create(<TextWrapper />).toJSON();

            expect(tree).toMatchSnapshot();
        });

        it('should exist text wrapper', () => {
            const wrapper = shallow(<Header />);

            expect(wrapper.find(TextWrapper)).toHaveLength(1);
        });
    });

    describe('Title', () => {
        it('should correct render', () => {
            const tree = renderer.create(<Title />).toJSON();

            expect(tree).toMatchSnapshot();
        });

        it('should exist', () => {
            const wrapper = shallow(<Header />);

            expect(wrapper.find(Title)).toHaveLength(1);
        });

        it('should have correct text', () => {
            const wrapper = shallow(<Header />);

            expect(wrapper.find(Title).text()).toEqual('Police Department of Berlin');
        });
    });

    describe('Description', () => {
        it('should correct render', () => {
            const tree = renderer.create(<Description />).toJSON();

            expect(tree).toMatchSnapshot();
        });

        it('should exist', () => {
            const wrapper = shallow(<Header />);

            expect(wrapper.find(Description)).toHaveLength(1);
        });

        it('should have correct text', () => {
            const wrapper = shallow(<Header />);

            expect(wrapper.find(Description).text()).toEqual('Stolen bikes');
        });
    });
});
