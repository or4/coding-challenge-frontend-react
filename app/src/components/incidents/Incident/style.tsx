import styled from 'styled-components';
import { media } from 'ui/utils';

export const Container = styled.div`
    display: flex;
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    outline: none;

    ${media.mobile`
		flex-direction: column;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  	`}

    ${media.tabletNDesktop`
    	min-height: 100px;
	`}

    &:hover {
        background: rgba(0, 0, 0, 0.03);
    }
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;

    ${media.tabletNDesktop`
        padding: 0 15px;
    `}
`;

export const IncidentTitle = styled.div`
    font-weight: 600;

    ${media.mobile`
        padding-bottom: 5px;
    `}

    ${media.tabletNDesktop`
        padding-bottom: 10px;
    `}
`;

export const IncidentDescription = styled.div`
    ${media.mobile`
        padding-bottom: 5px;
    `}

    ${media.tabletNDesktop`
        padding-bottom: 10px;
    `}
`;

export const IncidentDetails = styled.div``;
