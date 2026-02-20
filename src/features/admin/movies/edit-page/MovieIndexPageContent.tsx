import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import MovieIndexCard from "@/pages/movies/components/admin/movie-index-list/MovieIndexCard.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieIndexHeader from "@/pages/movies/components/headers/admin/MovieIndexHeader.tsx";
import PresetFilterDialog from "@/common/components/dialog/PresetFilterDialog.tsx";
import MovieQueryOptionFormContainer
    from "@/pages/movies/components/features/admin/movie-query-option/MovieQueryOptionFormContainer.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {MovieQueryOptionSchema} from "@/pages/movies/schema/queries/MovieQueryOption.schema.ts";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";

/**
 * Props for {@link MovieIndexPageContent}.
 */
type ContentProps = {
    /** Current page number */
    page: number;

    /** Number of items per page */
    perPage: number;

    /** Page state setter */
    setPage: (page: number) => void;

    /** Total number of available movies */
    totalItems: number;

    /** Movies to render for the current page */
    movies: MovieDetails[];
};

/**
 * Admin movie index page content.
 *
 * @remarks
 * Renders a paginated grid of movies with:
 * - Preset filter dialog synced to search params
 * - Empty-state fallback when no movies exist
 * - Pagination controls when results exceed page size
 */
const MovieIndexPageContent = (props: ContentProps) => {
    const {page, perPage, setPage, movies, totalItems} = props;
    const {searchParams} = useParsedSearchParams({schema: MovieQueryOptionSchema});

    // --- MOVIES ---
    const movieSection = (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <SectionHeader srOnly={true}>List Of Movies</SectionHeader>

            {movies.map((movie: MovieDetails) => (
                <MovieIndexCard className="w-16" movie={movie} key={movie._id}/>
            ))}
        </section>
    );

    const emptySection = (
        <PageCenter>
            <span className="text-neutral-400 select-none">
                There Are No Movies
            </span>
        </PageCenter>
    );

    const content = movies.length > 0
        ? movieSection
        : emptySection;

    // --- RENDER ---
    return (
        <PageFlexWrapper>
            <MovieIndexHeader/>

            <PresetFilterDialog
                title="Movie Filters"
                description="Filter and sort movies here."
            >
                <MovieQueryOptionFormContainer presetValues={searchParams}/>
            </PresetFilterDialog>

            {content}

            {totalItems > perPage && (
                <PaginationRangeButtons
                    page={page}
                    perPage={perPage}
                    totalItems={totalItems}
                    setPage={setPage}
                />
            )}
        </PageFlexWrapper>
    );
};

export default MovieIndexPageContent;
