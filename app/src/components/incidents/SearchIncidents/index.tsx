import React from 'react';
import DatePicker from 'react-datepicker';
import { QueryInput, DatePickerWrapper } from './style';

import 'react-datepicker/dist/react-datepicker.css';

export interface IProps {
    text?: string;
    onChangeQuery: (value: string) => void;
    from?: Date | null;
    to?: Date | null;
    onChangeFrom: (value?: Date | null) => void;
    onChangeTo: (value?: Date | null) => void;
}

export class SearchIncidents extends React.Component<IProps> {
    private onChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChangeQuery } = this.props;
        const { value } = event.target;

        onChangeQuery(value);
    };

    public render() {
        const { text = '', from, onChangeFrom, to, onChangeTo } = this.props;

        return (
            <>
                <QueryInput
                    data-test-id="search-incidents__query"
                    placeholder="Search on Stolen Bike Index"
                    value={text}
                    onChange={this.onChangeQuery}
                />
                <DatePickerWrapper data-test-id="search-incidents__date-from">
                    <DatePicker placeholderText={'from'} selected={from} onChange={onChangeFrom} />
                </DatePickerWrapper>
                <DatePickerWrapper data-test-id="search-incidents__date-to">
                    <DatePicker placeholderText={'to'} selected={to} onChange={onChangeTo} />
                </DatePickerWrapper>
            </>
        );
    }
}
