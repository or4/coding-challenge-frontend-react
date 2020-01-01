import styled from 'styled-components';

import { IProps as IButtonProps } from '.';

export const Container = styled.div`
    display: inline-block;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.9);
    background-color: #ffffff;
    cursor: ${(props: IButtonProps) => (props.canClick ? 'pointer' : 'default')};
    box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.9);
    border: 3px solid rgba(0, 0, 0, 0.9);

    line-height: 14px;
    height: 30px;
    user-select: none;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;

    font-size: 14px;
    padding: 5px 10px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    ${(props: IButtonProps) =>
        props.canClick
            ? `
                &:active {
                    background-color: rgba(0, 0, 0, 0.9);
                    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.9);
                    border: 3px solid transparent;
                    color: #ffffff;
                }`
            : ''}
`;
