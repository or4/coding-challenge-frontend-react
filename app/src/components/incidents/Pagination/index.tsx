import React from 'react';
import { Container, Button } from './style';

export interface IProps {
    totalPages: number;
    currentPage: number;
    onChange?: (page: number) => void;
}

export class Pagination extends React.PureComponent<IProps> {
    private hasNext() {
        return this.props.currentPage < this.props.totalPages;
    }

    private hasPrev() {
        return this.props.currentPage > 1;
    }

    private getNext() {
        if (!this.hasNext()) {
            return;
        }

        const { onChange, currentPage } = this.props;

        return <Button text={'Next'} page={currentPage + 1} onChange={onChange} data-test-id="pagination-next" />;
    }

    private getPrev() {
        if (!this.hasPrev()) {
            return;
        }

        const { onChange, currentPage } = this.props;

        return <Button text={'Prev'} page={currentPage - 1} onChange={onChange} data-test-id="pagination-prev" />;
    }

    private getNumberButtons() {
        const { onChange, currentPage } = this.props;
        const nextPage = currentPage + 1;
        const prevPage = currentPage - 1;

        return (
            <>
                {this.hasPrev() && (
                    <Button page={prevPage} onChange={onChange} data-test-id={`pagination-page-${prevPage}`} />
                )}
                <Button
                    page={currentPage}
                    onChange={onChange}
                    current={true}
                    data-test-id={`pagination-page-${currentPage}`}
                />
                {this.hasNext() && (
                    <Button page={nextPage} onChange={onChange} data-test-id={`pagination-page-${nextPage}`} />
                )}
            </>
        );
    }

    public render() {
        if (this.props.totalPages === 0) {
            return null;
        }

        return (
            <Container data-test-id="pagination">
                {this.getPrev()}
                {this.getNumberButtons()}
                {this.getNext()}
            </Container>
        );
    }
}
