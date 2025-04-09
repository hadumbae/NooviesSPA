import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingIndexHeader from "@/pages/showings/components/headers/ShowingIndexHeader.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import {useFetchPaginatedShowings} from "@/pages/showings/hooks/queries/useFetchPaginatedShowings.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import ShowingCardList from "@/pages/showings/components/ShowingCardList.tsx";
import useShowingQueryErrorHandler from "@/pages/showings/hooks/errors/useShowingQueryErrorHandler.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {PaginatedShowings, PaginatedShowingSchema} from "@/pages/showings/schema/ShowingPaginationSchema.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";

const ShowingsPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams({perPage: "25"});
    const {data, isPending, isError, error, refetch} = useFetchPaginatedShowings({page, perPage});

    useShowingQueryErrorHandler(error);

    const paginatedShowings = useValidateData<typeof PaginatedShowingSchema, PaginatedShowings>(
        {schema: PaginatedShowingSchema, data, isPending}
    );

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    const onShowingDelete = () => refetch();

    const {items: showings} = paginatedShowings!;
    const hasShowings = (showings || []).length > 0;

    return (
        <PageFlexWrapper>
            <ShowingIndexHeader />

            {
                hasShowings
                    ? <PageSection>
                        <ShowingCardList showings={showings} onShowingDelete={onShowingDelete} />
                    </PageSection>
                    : <PageCenter>
                        <span className="text-neutral-400 select-none">There Are No Showings</span>
                    </PageCenter>
            }

        </PageFlexWrapper>
    );
};

export default ShowingsPage;
