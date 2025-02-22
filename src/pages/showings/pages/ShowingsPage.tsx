import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingIndexHeader from "@/pages/showings/components/headers/ShowingIndexHeader.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import {useFetchPaginatedShowings} from "@/pages/showings/hooks/queries/useFetchPaginatedShowings.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import ShowingCardList from "@/pages/showings/components/ShowingCardList.tsx";
import useShowingQueryErrorHandler from "@/pages/showings/hooks/errors/useShowingQueryErrorHandler.ts";
import useValidateData from "@/common/hooks/validation/useValidateData.ts";
import {PaginatedShowings, PaginatedShowingSchema} from "@/pages/showings/schema/ShowingPaginationSchema.ts";

const ShowingsPage: FC = () => {
    const {page, perPage} = usePaginationSearchParams({perPage: "25"});
    const {data, isPending, isError, error, refetch} = useFetchPaginatedShowings({page, perPage});

    useShowingQueryErrorHandler(error);

    const paginatedShowings = useValidateData<typeof PaginatedShowingSchema, PaginatedShowings>(
        {schema: PaginatedShowingSchema, data, isPending}
    );

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    const {items: showings} = paginatedShowings!;

    const onDelete = () => {
        refetch();
    }

    return (
        <PageFlexWrapper>
            <ShowingIndexHeader />

            <section className="space-y-2">
                <ShowingCardList showings={showings} onShowingDelete={onDelete} />
            </section>
        </PageFlexWrapper>
    );
};

export default ShowingsPage;
