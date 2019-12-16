import React from 'react';
import { IMedia } from 'types';

import { Container, Preview, Image } from './style';

export type IProps = IMedia;

export const ImageThumb = ({ imageUrlThumb }: IProps) => {
    const isPreview = !imageUrlThumb;
    const content = isPreview ? (
        <Preview data-test-id="incident-image__preview" />
    ) : (
        <Image style={{ backgroundImage: `url(${imageUrlThumb})` }} data-test-id="incident-image__image">
            <img src={imageUrlThumb} alt="incident" height="0" />
        </Image>
    );

    return <Container isPreview={isPreview}>{content}</Container>;
};
