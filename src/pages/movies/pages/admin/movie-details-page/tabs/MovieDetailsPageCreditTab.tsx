/**
 * @file MovieDetailsPageCreditTab.tsx
 *
 * @summary
 * Tab component displaying the credits for a specific movie.
 *
 * @description
 * Fetches and validates movie credit data, then renders
 * an overview inside a tab panel. Uses query boundaries to
 * handle loading, errors, and schema validation.
 */

import useFetchMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import MovieDetailsCreditOverview from "@/pages/movies/components/details/MovieDetailsCreditOverview.tsx";
import { TabsContent } from "@/common/components/ui/tabs.tsx";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import { MovieCreditDetailsArraySchema } from "@/pages/moviecredit/schemas/model/MovieCreditExtended.schema.ts";
import { MovieCreditDetailsArray } from "@/pages/moviecredit/schemas/model/MovieCreditExtended.types.ts";

/**
 * @summary Props for MovieDetailsPageCreditTab.
 */
type TabProps = {
    /** The ID of the movie to fetch credits for. */
    movieID: ObjectId;
};

/**
 * @summary Movie credits tab component.
 *
 * @description
 * Fetches and displays cast credits for a movie inside the
 * "credits" tab of the movie details page. Handles loading,
 * error, and validation states via QueryBoundary and
 * ValidatedQueryBoundary.
 *
 * @param movieID - The ID of the movie to fetch credits for.
 */
const MovieDetailsPageCreditTab = ({ movieID }: TabProps) => {
    const query = useFetchMovieCredits({
        movie: movieID,
        populate: true,
        virtuals: true,
        limit: 6,
        department: "CAST",
        sortByBillingOrder: "asc",
    });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={MovieCreditDetailsArraySchema}>
                {(credits: MovieCreditDetailsArray) => {
                    return (
                        <TabsContent value="credits">
                            <MovieDetailsCreditOverview movieID={movieID} credits={credits} />
                        </TabsContent>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MovieDetailsPageCreditTab;
