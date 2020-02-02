import React from 'react';
import { Container } from './style';

export interface IProps {
    value?: number;
}

export const TotalIncidents = ({ value }: IProps) => {
    if (value !== 0 && !value) {
        return null;
    }

    return <Container data-test-id="total-incidents">{`Total: ${value}`}</Container>;
};
