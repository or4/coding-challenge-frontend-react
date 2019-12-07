import styled from 'styled-components';

import { media } from 'ui/utils';

export const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    ${media.mobile`
        height: 60px;
        margin-bottom: 15px;
    `}

    ${media.tablet`
        height: 100px;
    `}

    ${media.desktop`
        height: 140px;
    `}
`;

export const Logo = styled.img`
    width: 64px;
    height: 64px;

    ${media.tabletNDesktop`
        padding: 0 18px;
    `}
`;

export const TextWrapper = styled.div`
    padding-left: 15px;
`;

export const Title = styled.div`
    font-weight: 600;

	${media.mobile`
    	font-size: 18px;
  	`}

	${media.tablet`
    	font-size: 32px;
	`}

    ${media.desktop`
    	font-size: 48px;
	`}
`;

export const Description = styled.div`
	font-weight: 600;

	${media.mobile`
    	font-size: 14px;
  	`}

	${media.tablet`
    	font-size: 16px;
	`}

    ${media.desktop`
    	font-size: 32px;
	`}
`;
