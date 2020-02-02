import React from 'react';
import { Container } from './style';

export interface IProps {
    children?: JSX.Element | JSX.Element[];
}

export const UpperPanel = ({ children }: IProps) => (
    <Container data-test-id="upper-panel__container">{children}</Container>
);
