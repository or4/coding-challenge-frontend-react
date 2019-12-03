import React from 'react';
import styled from 'styled-components';
import { IIncident } from 'types';

type IProps = IIncident;

const Container = styled.div``;

export const Incident: React.FC<IProps> = (props: IProps) => (
    <Container data-test-id="inicidents-list__item">{props.id}</Container>
);
