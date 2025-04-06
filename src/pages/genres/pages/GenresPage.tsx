import {FC} from 'react';
import useFetchPaginatedGenres from "@/pages/genres/hooks/useFetchPaginatedGenres.ts";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import GenreCardList from "@/pages/genres/components/cards/GenreCardList.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import GenreIndexHeader from "@/pages/genres/components/headers/GenreIndexHeader.tsx";

const GenresPage: FC = () => {
    useTitle("Genres");

    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedGenres({page, perPage, queries: {}});

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />

    const {items: genres} = data;

    return (
        <PageFlexWrapper>
            <GenreIndexHeader />

            <section className="flex-1 space-y-3">
                <GenreCardList genres={genres} onGenreDelete={() => refetch()} />
            </section>
        </PageFlexWrapper>
    );
};

export default GenresPage;
