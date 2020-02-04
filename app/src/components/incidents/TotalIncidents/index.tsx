import React from 'react';
import { Container } from './style';

export interface IProps {
    value?: number;
}

export const TotalIncidents = ({ value }: IProps) => {
    return <Container data-test-id="total-incidents">{`Total: ${value || 0}`}</Container>;
};
