import React from 'react';
import { IIncident } from 'types';
import { dateToString } from 'utils/dateFormat';
import { Container, TextContainer, IncidentTitle, IncidentDescription, IncidentDetails } from './style';
import { ImageThumb } from './ImageThumb';

type IProps = IIncident;

export const Incident: React.FC<IProps> = (props: IProps) => (
    <Container>
        <ImageThumb {...props.media} />
        <TextContainer data-test-id="inicidents-list__item">
            <IncidentTitle>{props.title}</IncidentTitle>
            {props.description && <IncidentDescription>{props.description}</IncidentDescription>}
            <IncidentDetails>{getDetails(props)}</IncidentDetails>
        </TextContainer>
    </Container>
);

function getDetails({ occurredAt, address }: IProps) {
    const date = occurredAt && dateToString(occurredAt);

    if (date && address) {
        return `${date} - ${address}`;
    }

    return date ? date : address;
}
