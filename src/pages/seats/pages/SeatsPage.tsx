import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import SeatListHeader from "@/pages/seats/components/headers/SeatListHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import useFetchSeats from "@/pages/seats/hooks/fetch/useFetchSeats.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import SeatListCard from "@/pages/seats/components/seats/admin/SeatListCard.tsx";
import {PaginatedSeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";

const SeatsPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error: queryError} = useFetchSeats({paginated: true, page, perPage});
    const {data: paginatedSeats, error: parseError, success} = useValidateData({
        data,
        isPending,
        schema: PaginatedSeatSchema,
        message: "Invalid Seat Data.",
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>;
    if (!success) return <PageParseError error={parseError}/>;

    const {items: seats} = paginatedSeats;
    const hasSeats = (seats || []).length > 0;

    return (
        <PageFlexWrapper>
            <SeatListHeader/>

            {
                hasSeats
                    ? <PageSection>
                        {seats.map((seat) => <SeatListCard key={seat._id} seat={seat}/>)}
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
