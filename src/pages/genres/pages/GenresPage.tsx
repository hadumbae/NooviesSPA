import {FC} from 'react';
import useFetchPaginatedGenres from "@/pages/genres/hooks/useFetchPaginatedGenres.ts";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import GenreCardList from "@/pages/genres/components/cards/GenreCardList.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import GenreIndexHeader from "@/pages/genres/components/headers/GenreIndexHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";

const GenresPage: FC = () => {
    useTitle("Genres");

    const {page, perPage} = usePaginationSearchParams();
    const {data, isPending, isError, error, refetch} = useFetchPaginatedGenres({page, perPage, queries: {}});

    if (isPending) return <PageLoader />
    if (isError) return <PageError error={error} />

    const {items: genres} = data;
    const hasGenres = (genres || []).length > 0;

    const onGenreDelete = () => refetch();

    return (
        <PageFlexWrapper>
            <GenreIndexHeader />

            {
                hasGenres
                    ? <PageSection>
                        <GenreCardList genres={genres} onGenreDelete={onGenreDelete} />
                    </PageSection>
                    : <PageCenter>
                        <span className="text-neutral-400 select-none">There Are No Genres</span>
                    </PageCenter>
            }

        </PageFlexWrapper>
    );
};

export default GenresPage;
