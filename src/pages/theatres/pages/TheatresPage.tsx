import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreCardList from "@/pages/theatres/components/TheatreCardList.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import {useFetchPaginatedTheatres} from "@/pages/theatres/hooks/queries/useFetchPaginatedTheatres.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import TheatreIndexHeader from "@/pages/theatres/components/headers/TheatreIndexHeader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";

const TheatresPage: FC = () => {
    useTitle("Theatre Index")

    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedTheatres({page, perPage});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />

    const {items: theatres} = data;
    const onDelete = () => refetch();

    return (
        <PageFlexWrapper>
            <TheatreIndexHeader />

            <section className="space-y-4">
                <TheatreCardList theatres={theatres} onDelete={onDelete} />
            </section>
        </PageFlexWrapper>
    );
};

export default TheatresPage;
