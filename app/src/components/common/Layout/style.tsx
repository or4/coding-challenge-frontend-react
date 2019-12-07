import styled from 'styled-components';

import { media } from 'ui/utils';

export const Container = styled.div`
    margin: 0 auto 15px;

    ${media.mobile`
		padding: 15px;
  	`}

	${media.tablet`
		padding: 15px;
	`}

    ${media.desktop`
		max-width: 940px;
	`}
`;
