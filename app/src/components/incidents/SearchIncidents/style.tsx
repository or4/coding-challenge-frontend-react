import styled from 'styled-components';
import { media } from 'ui/utils';

export const QueryInput = styled.input`
    min-width: 240px;
    padding: 4px 8px;
    flex-grow: 1;
    margin: 5px 5px;

    ${media.mobileNTablet`
		width: 100%;
	`}
`;
