import React from 'react';
import { Container } from './style';

export interface IProps {
    text?: string;
    onChange: (value: string) => void;
}

export class SearchIncidents extends React.Component<IProps> {
    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange } = this.props;
        const { value } = event.target;

        onChange(value);
    };

    public render() {
        const { text = '' } = this.props;

        return (
            <Container data-test-id="search-incidents">
                <input value={text} onChange={this.onChange} />
            </Container>
        );
    }
}
