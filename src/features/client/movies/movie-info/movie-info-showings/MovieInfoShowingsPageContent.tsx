/**
 * @file MovieInfoShowingsPageContent.tsx
 *
 * Page content component for displaying a movie’s available showings.
 *
 * @remarks
 * Responsible for:
 * - Rendering the movie header (title, release year, navigation)
 * - Providing theatre-level filtering controls via query form
 * - Displaying paginated showing results
 * - Handling pagination state updates
 *
 * Data fetching and query orchestration are handled by the parent page.
 */

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import TheatreShowingQueryFormContainer
    from "@/pages/showings/components/forms/theatre-showing-query/TheatreShowingQueryFormContainer.tsx";
import {DisableKeys} from "@/common/type/form/HookFormFieldTypes.ts";
import {
    TheatreShowingQueryOptions
} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.types.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {
    TheatreShowingQueryOptionSchema
} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.schema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import ShowingInfoCompactListCard from "@/pages/showings/components/client/showing-list/ShowingInfoCompactListCard.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import MovieInfoShowingHeader from "@/features/client/movies/movie-showing-info/MovieInfoShowingHeader.tsx";

/**
 * Props for {@link MovieInfoShowingsPageContent}.
 */
type ContentProps = {
    /** Current pagination page. */
    page: number;

    /** Number of showings per page. */
    perPage: number;

    /** Pagination state setter. */
    setPage: (page: number) => void;

    /** Movie metadata. */
    movie: MovieDetails;

    /** Total number of matching showings. */
    totalShowings: number;

    /** Showing records for the current page. */
    showings: ShowingDetails[];
};

/**
 * Renders the main content for a movie’s showings page.
 *
 * @remarks
 * - Locks movie, theatre, and screen slugs in the query form
 * - Syncs query form state with URL search parameters
 * - Displays showings as compact list cards
 * - Conditionally renders pagination controls
 *
 * @param props - Page content props.
 * @returns Movie showings page content.
 */
const MovieInfoShowingsPageContent = (
    {page, perPage, movie, totalShowings, showings, setPage}: ContentProps
) => {
    const {title, releaseDate, slug} = movie;

    const {searchParams: presetValues} =
        useParsedSearchParams({schema: TheatreShowingQueryOptionSchema});

    const disabledFields: DisableKeys<TheatreShowingQueryOptions> = [
        "theatreSlug",
        "movieSlug",
        "screenSlug",
    ];

    return (
        <PageFlexWrapper className="space-y-6">
            <MovieInfoShowingHeader
                movieTitle={title}
                movieSlug={slug}
                releaseDate={releaseDate}
            />

            <section>
                <SectionHeader srOnly={true}>Theatre Options</SectionHeader>

                <Card>
                    <CardContent className="p-2">
                        <TheatreShowingQueryFormContainer
                            disableFields={disabledFields}
                            presetValues={presetValues}
                        />
                    </CardContent>
                </Card>
            </section>

            <section className="space-y-2">
                <SectionHeader>Showings</SectionHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {showings.map(showing => (
                        <ShowingInfoCompactListCard
                            key={showing._id}
                            showing={showing}
                        />
                    ))}
                </div>

                {totalShowings > perPage && (
                    <PaginationRangeButtons
                        page={page}
                        perPage={perPage}
                        totalItems={totalShowings}
                        setPage={setPage}
                    />
                )}
            </section>
        </PageFlexWrapper>
    );
};

export default MovieInfoShowingsPageContent;
