import React from 'react';

import { Header } from '../Header';
import { Container } from './style';

export const Layout: React.FC = ({ children }) => (
    <Container>
        <Header />
        {children}
    </Container>
);
