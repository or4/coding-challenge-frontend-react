import React from 'react';
import { IMedia } from 'types';

import { Container, Preview, Image } from './style';

export type IProps = IMedia;

export const ImageThumb = ({ imageUrlThumb }: IProps) => {
    const isPreview = !imageUrlThumb;
    const content = isPreview ? <Preview /> : <Image imageUrl={imageUrlThumb} />;

    return <Container isPreview={isPreview}>{content}</Container>;
};
