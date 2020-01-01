import React from 'react';

import { Button } from '../Button';

interface IProps {
    className?: string;
    onChange?: (page: number) => void;
    page: number;
    text?: string;
    current?: boolean;
}

export class PageButton extends React.PureComponent<IProps> {
    public onChange = () => {
        const { onChange, page } = this.props;

        onChange && onChange(page);
    };

    public render() {
        const { className, text = this.props.page, current, ...rest } = this.props;

        return (
            <Button className={className} onClick={this.onChange} canClick={!current} {...rest}>
                {text}
            </Button>
        );
    }
}
