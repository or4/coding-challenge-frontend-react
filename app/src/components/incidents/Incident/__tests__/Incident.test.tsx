import React from 'react';
import { shallow } from 'enzyme';
import { getFakeIncidents } from 'core/incidents/__mocks__/fakeIncidents';
import { IIncident } from 'types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Incident } from '../index';
import { IncidentTitle, IncidentDescription, IncidentDetails } from '../style';

describe('Incident', () => {
    let incident: IIncident;

    beforeEach(() => {
        incident = getFakeIncidents(1)[0];
    });

    it('should correct render component', () => {
        const tree = renderer.create(<Incident {...incident} />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should have title', () => {
        const wrapper = shallow(<Incident {...incident} />);
        const title = wrapper.find(IncidentTitle);

        expect(title.exists()).toBeTruthy();
        expect(title).toHaveLength(1);
        expect(title.children().text()).toBe(incident.title);
    });

    it('should have description', () => {
        const wrapper = shallow(<Incident {...incident} />);
        const description = wrapper.find(IncidentDescription);

        expect(description.exists()).toBeTruthy();
        expect(description).toHaveLength(1);
        expect(description.children().text()).toBe(incident.description);
    });

    it('should have details', () => {
        const wrapper = shallow(<Incident {...incident} />);
        const description = wrapper.find(IncidentDetails);

        expect(description.exists()).toBeTruthy();
        expect(description).toHaveLength(1);
        expect(description.text()).toBe('Thu Oct 24 2019 - Berlin, 10963, DE');
    });

    it('should no description', () => {
        const wrapper = shallow(<Incident {...incident} description={undefined} />);
        const description = wrapper.find(IncidentDescription);

        expect(description.exists()).toBeFalsy();
        expect(description).toHaveLength(0);
    });
});
