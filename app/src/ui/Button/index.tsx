import React from 'react';
import { Container } from './style';

export interface IProps {
    onClick?: () => void;
    className?: string;
    canClick: boolean;
}

export class Button extends React.PureComponent<IProps> {
    public onClick = () => {
        const { canClick, onClick } = this.props;

        canClick && onClick && onClick();
    };
    public render() {
        // onClick here, for remove from rest
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { children, onClick, className, ...rest } = this.props;

        return (
            <Container className={className} onClick={this.onClick} {...rest}>
                {children}
            </Container>
        );
    }
}
