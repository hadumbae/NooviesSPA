import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import {useFetchPaginatedSeats} from "@/pages/seats/hooks/useFetchPaginatedSeats.ts";
import SeatCardList from "@/pages/seats/components/SeatCardList.tsx";
import SeatListHeader from "@/pages/seats/components/headers/SeatListHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";

const SeatsPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedSeats({page, perPage});

    if (isPending) return <PageLoader/>;
    if (isError) return <PageError error={error}/>

    const onDelete = () => refetch();

    const {items: seats} = data;
    const hasSeats = (seats || []).length > 0;

    return (
        <PageFlexWrapper>
            <SeatListHeader/>

            {
                hasSeats
                    ? <PageSection>
                        <SeatCardList seats={seats} onDelete={onDelete}/>
                    </PageSection>
                    : <PageCenter>
                        <span className="text-neutral-400 select-none">There Are No Seats</span>
                    </PageCenter>
            }

            {/* TODO Pagination */}
        </PageFlexWrapper>
    );
};

export default SeatsPage;
