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
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import GenreQueryOptionCollapsible
    from "@/pages/genres/components/admin/genre-query-options/GenreQueryOptionCollapsible.tsx";
import useGenreQueryOptionSearchParams
    from "@/pages/genres/hooks/features/genre-query-option/useGenreQueryOptionSearchParams.ts";

/**
 * A page displaying all available genres with search filters, pagination, and responsive layout.
 *
 * This component orchestrates multiple utilities:
 * - URL-based pagination and query parameter synchronization
 * - Automatic validation of server responses via {@link ValidatedQueryBoundary}
 * - Debounced, auto-submitting filters managed through {@link GenreQueryOptionCollapsible}
 * - Adaptive grid rendering for both mobile and desktop layouts
 *
 * ### Features
 * - Fetches genres through {@link useFetchGenres}, supporting pagination and query options.
 * - Persists pagination state in the URL via {@link usePaginationSearchParams}.
 * - Validates paginated API responses with {@link PaginatedGenreDetailsSchema}.
 * - Dynamically displays loading, error, and empty states through query boundaries.
 *
 * @component
 * @example
 * ```tsx
 * import GenreIndexPage from "@/pages/genres/components/pages/GenreIndexPage";
 *
 * export default function AdminGenres() {
 *   return <GenreIndexPage />;
 * }
 * ```
 */
const GenreIndexPage: FC = () => {
    // ⚡ Page Setup ⚡
    useTitle("Genres");
    const isMobile = useIsMobile();

    // ⚡ Pagination & Query Params ⚡
    const {data: paginationState} = usePaginationLocationState();
    const {page, perPage, setPage} = usePaginationSearchParams(paginationState ?? {page: 1, perPage: 25});
    const {searchParams} = useGenreQueryOptionSearchParams();

    // ⚡ Data Fetching ⚡
    const query = useFetchGenres({
        virtuals: true,
        populate: true,
        paginated: true,
        page,
        perPage,
        ...searchParams,
    });

    // ⚡ Rendering ⚡
    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedGenreDetailsSchema}>
                {(paginatedGenres: PaginatedGenreDetails) => {
                    const {totalItems, items: genres} = paginatedGenres;
                    const hasGenres = (genres || []).length > 0;

                    // Filter Section
                    const filterSection = (
                        <section>
                            <SectionHeader srOnly={true}>Filter Genres</SectionHeader>
                            <GenreQueryOptionCollapsible
                                className="grid grid-cols-1 gap-4 items-center"
                                presetValues={searchParams}
                            />
                        </section>
                    );

                    // Genre List Section
                    const genreSection = (
                        <PageSection className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {genres.map((genre: GenreDetails) => (
                                <GenreIndexCard
                                    orientation={isMobile ? "vertical" : "horizontal"}
                                    genre={genre}
                                    key={genre._id}
                                />
                            ))}
                        </PageSection>
                    );

                    // Empty State Section
                    const emptySection = (
                        <PageCenter>
                            <span className="text-neutral-400 select-none">There Are No Genres</span>
                        </PageCenter>
                    );

                    // Pagination Buttons
                    const paginationButtons = (
                        (totalItems > perPage) && (
                            <EllipsisPaginationButtons
                                page={page}
                                perPage={perPage}
                                totalItems={totalItems}
                                setPage={setPage}
                            />
                        )
                    );

                    // Final Page Layout
                    return (
                        <PageFlexWrapper>
                            <GenreIndexHeader />
                            {filterSection}
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
