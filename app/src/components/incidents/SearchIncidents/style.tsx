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

export const DatePickerWrapper = styled.div`
    margin: 5px 5px;

    & input {
        width: 180px;
    }

    ${media.mobile`
		width: 100%;

		& .react-datepicker-wrapper {
			width: 100%;
		}

		& .react-datepicker__input-container {
			width: 100%;
		}

		& input {
			width: 100%;
		}
	`}
`;
