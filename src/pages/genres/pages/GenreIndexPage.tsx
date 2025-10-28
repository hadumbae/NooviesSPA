import {FC} from 'react';
import usePaginationSearchParams from "@/common/hooks/search-params/usePaginationSearchParams.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import GenreIndexHeader from "@/pages/genres/components/headers/GenreIndexHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import useFetchGenres from "@/pages/genres/hooks/useFetchGenres.ts";
import {PaginatedGenreDetailsSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {GenreDetails, PaginatedGenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import GenreIndexCard from "@/pages/genres/components/cards/GenreIndexCard.tsx";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import usePaginationLocationState from "@/common/hooks/router/usePaginationLocationState.ts";
import EllipsisPaginationButtons from "@/common/components/pagination/EllipsisPaginationButtons.tsx";

const GenreIndexPage: FC = () => {
    useTitle("Genres");

    const isMobile = useIsMobile();

    const {data: paginationState} = usePaginationLocationState();
    const {page, perPage, setPage} = usePaginationSearchParams(paginationState ?? {page: 1, perPage: 25});

    const query = useFetchGenres({virtuals: true, populate: true, paginated: true, page, perPage});

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedGenreDetailsSchema}>
                {(paginatedGenres: PaginatedGenreDetails) => {
                    const {totalItems, items: genres} = paginatedGenres;
                    const hasGenres = (genres || []).length > 0;

                    const genreSection = (
                        <PageSection className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {genres.map((genre: GenreDetails) => (
                                <GenreIndexCard
                                    orientation={isMobile ? "vertical" : 'horizontal'}
                                    genre={genre}
                                    key={genre._id}
                                />
                            ))}
                        </PageSection>
                    );

                    const emptySection = (
                        <PageCenter>
                            <span className="text-neutral-400 select-none">There Are No Genres</span>
                        </PageCenter>
                    );

                    const paginationButtons = (
                        (totalItems > perPage) &&
                        <EllipsisPaginationButtons
                            page={page}
                            perPage={perPage}
                            totalItems={totalItems}
                            setPage={setPage}
                        />
                    );

                    return (
                        <PageFlexWrapper>
                            <GenreIndexHeader/>
                            {hasGenres ? genreSection : emptySection}
                            {paginationButtons}
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default GenreIndexPage;
