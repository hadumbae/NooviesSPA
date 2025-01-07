import {FC} from 'react';
import HeaderTitle from "@/common/components/page/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/HeaderLink.tsx";
import {Plus} from "lucide-react";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import {useFetchPaginatedSeats} from "@/pages/seats/hooks/useFetchPaginatedSeats.ts";
import SeatCardList from "@/pages/seats/components/SeatCardList.tsx";

const SeatsPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedSeats({page, perPage});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    const {items: seats} = data;

    const onDelete = () => {
        refetch();
    }

    return (
        <PageFlexWrapper>
            <header className="flex justify-between items-center">
                <div>
                    <HeaderTitle>Seats</HeaderTitle>
                    <HeaderDescription>The seats where the movies will be shown.</HeaderDescription>
                </div>

                <HeaderLink to="/admin/seats/create">
                    <Plus />
                </HeaderLink>
            </header>

            <section>
                <SeatCardList seats={seats} onDelete={onDelete} />
            </section>
        </PageFlexWrapper>
    );
};

export default SeatsPage;
