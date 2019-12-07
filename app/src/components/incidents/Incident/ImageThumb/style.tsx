import styled, { StyledComponent } from 'styled-components';
import { media } from 'ui/utils';

import prevewSvg from './assets/preview.svg';
import { IProps } from '.';

interface IContainerProps {
    isPreview: boolean;
}

export const Container: StyledComponent<'div', any, IContainerProps, never> = styled.div`
    ${media.mobile`
        display: ${(props: IContainerProps) => (props.isPreview ? 'none' : 'inherit')};
		padding-bottom: 10px;
  	`}

    ${media.tabletNDesktop`
		width: 100px;
		height: 100px;
		min-width: 100px;
		min-height: 100px;

		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, 0.05);
    	background: rgba(0, 0, 0, 0.02);
	`}
`;

export const Image = styled.div`
    background-image: url(${(props: IProps) => props.imageUrl});
    background-repeat: no-repeat;
    background-size: cover;

    ${media.mobile`
		padding-top: 100%;
		width: 100%;
  	`}

    ${media.tabletNDesktop`
		width: 90px;
		height: 90px;
	`}
`;

export const Preview = styled.div`
    background-image: url(${prevewSvg});
    background-repeat: no-repeat;
    background-size: cover;

    width: 55px;
    height: 32px;

    ${media.mobile`
		display: none;
  	`}
`;
