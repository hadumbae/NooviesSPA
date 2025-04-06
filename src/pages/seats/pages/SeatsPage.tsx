import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import {useFetchPaginatedSeats} from "@/pages/seats/hooks/useFetchPaginatedSeats.ts";
import SeatCardList from "@/pages/seats/components/SeatCardList.tsx";
import SeatListHeader from "@/pages/seats/components/headers/SeatListHeader.tsx";

const SeatsPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedSeats({page, perPage});

    if (isPending) return <PageLoader/>;
    if (isError) return <PageError error={error}/>

    const {totalItems, items: seats} = data;

    const onDelete = () => refetch();

    return (
        <PageFlexWrapper>
            {/* Header */}
            <SeatListHeader/>

            {/* Cards */}
            <section>
                <SeatCardList seats={seats} onDelete={onDelete}/>
            </section>

            {/* TODO Pagination */}
            {
                totalItems > perPage &&
                <section>
                    TODO Pagination
                </section>
            }
        </PageFlexWrapper>
    );
};

export default SeatsPage;
