import styled from 'styled-components';

import { PageButton } from 'ui/PageButton';

export const Container = styled.div`
    text-align: center;
    margin: 15px 0;
`;

export const Button = styled(PageButton)`
    margin-right: calc(15px + 3px);

    &:last-child {
        margin-right: 0;
    }
`;
