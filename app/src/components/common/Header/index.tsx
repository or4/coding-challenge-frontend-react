import React from 'react';
import logo from './assets/logo.png';
import { Container, Logo, TextWrapper, Title, Description } from './style';

export const Header = () => (
    <Container>
        <Logo src={logo} />
        <TextWrapper>
            <Title>Police Department of Berlin</Title>
            <Description>Stolen bikes</Description>
        </TextWrapper>
    </Container>
);
