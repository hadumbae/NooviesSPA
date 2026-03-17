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

import {MovieDetails} from "@/domains/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TheatreShowingQueryFormContainer
    from "@/domains/showings/components/forms/theatre-showing-query/TheatreShowingQueryFormContainer.tsx";
import {DisableKeys} from "@/common/type/form/HookFormFieldTypes.ts";
import {
    ShowingsPageQueryStrings
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.types.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {
    ShowingsPageQueryStringSchema
} from "@/domains/movies/views/client/movie-info-showings-page/schemas/QueryStrings.schema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import ShowingInfoCompactListCard from "@/domains/showings/components/client/showing-list/ShowingInfoCompactListCard.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import PaginationRangeButtons from "@/common/components/pagination/PaginationRangeButtons.tsx";
import MovieInfoHeader from "@/features/client/movies/components/headers/MovieInfoHeader.tsx";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";

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
    const {title, posterImage, slug} = movie;

    const {searchParams: presetValues} = useParsedSearchParams({
        schema: ShowingsPageQueryStringSchema,
        defaultValues: {page},
    });

    const disabledFields: DisableKeys<ShowingsPageQueryStrings> = [
        "page",
    ];

    return (
        <PageFlexWrapper className="space-y-6">
            <MovieInfoHeader
                movieSlug={slug}
                movieTitle={title}
                posterURL={posterImage?.secure_url}
                pageText="Showings"
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
