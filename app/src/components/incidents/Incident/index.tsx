import React from 'react';
import { IIncident } from 'types';
import { dateToString } from 'utils/dateFormat';
import { Container, TextContainer, IncidentTitle, IncidentDescription, IncidentDetails } from './style';
import { ImageThumb } from './ImageThumb';

type IProps = IIncident;

export const Incident: React.FC<IProps> = (props: IProps) => (
    <Container data-test-id="incident">
        <ImageThumb {...props.media} />
        <TextContainer>
            <IncidentTitle data-test-id="incident__title">{props.title}</IncidentTitle>
            {props.description && (
                <IncidentDescription data-test-id="incident__description">{props.description}</IncidentDescription>
            )}
            <IncidentDetails>{getDetails(props)}</IncidentDetails>
        </TextContainer>
    </Container>
);

function getDetails({ occurredAt, address }: IProps) {
    const date = occurredAt && dateToString(occurredAt);
    const dateComponent = <span data-test-id="incident__date">{date}</span>;
    const addressComponent = <span data-test-id="incident__address">{address}</span>;

    if (dateComponent && addressComponent) {
        return (
            <>
                {dateComponent} – {addressComponent}
            </>
        );
    }

    return dateComponent ? dateComponent : addressComponent;
}
