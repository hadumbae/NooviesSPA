/**
 * @file ShowingMovieTab.tsx
 *
 * Admin tab displaying a movie overview with its recent Showings.
 *
 * Combines:
 * - Movie detail fetching
 * - Recent Showing queries scoped to the movie
 * - Schema validation and aggregated query boundaries
 */

import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import { CombinedSchemaQuery } from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import { MovieDetailsSchema } from "@/pages/movies/schema/movie/Movie.schema.ts";
import useFetchShowings from "@/pages/showings/hooks/queries/useFetchShowings.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import { ShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import ShowingMovieCard from "@/pages/showings/components/admin/card/showing-movie-card/ShowingMovieCard.tsx";
import ShowingSummaryCardList from "@/pages/showings/components/admin/card/showing-summary-card/ShowingSummaryCardList.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import { ShowingDetailsArraySchema } from "@/pages/showings/schema/showing/ShowingRelated.schema.ts";

/**
 * Combined query result shape for {@link ShowingMovieTab}.
 */
type QueryParams = {
    movie: MovieDetails;
    showings: ShowingDetails[];
};

/**
 * Props for {@link ShowingMovieTab}.
 */
type TabProps = {
    /** Target movie ID used to resolve details and related showings */
    movieID: ObjectId;
};

/**
 * Renders an admin tab showing a movie summary and its latest Showings.
 *
 * - Fetches movie details and showings in parallel
 * - Limits showings to the 10 most recent entries
 * - Validates all query results via schema boundaries
 */
const ShowingMovieTab = ({ movieID }: TabProps) => {
    const movieQuery = useFetchMovie({
        _id: movieID,
        config: { populate: true, virtuals: true },
    });

    const showingQuery = useFetchShowings({
        queries: { movie: movieID, sortByStartTime: -1 },
        config: { populate: true, virtuals: true, limit: 10 },
    });

    const queries = [movieQuery, showingQuery];

    const queryValidation: CombinedSchemaQuery[] = [
        { query: movieQuery, schema: MovieDetailsSchema, key: "movie" },
        { query: showingQuery, schema: ShowingDetailsArraySchema, key: "showings" },
    ];

    return (
        <CombinedQueryBoundary queries={queries}>
            <CombinedValidatedQueryBoundary queries={queryValidation}>
                {(data: unknown) => {
                    const { movie, showings } = data as QueryParams;

                    return (
                        <div className="flex flex-col space-y-4">
                            <section className="space-y-2">
                                <SectionHeader>Movie</SectionHeader>
                                <ShowingMovieCard movie={movie} />
                            </section>

                            <section className="space-y-2">
                                <SectionHeader>Recent Showings</SectionHeader>
                                <ShowingSummaryCardList showings={showings} />
                            </section>
                        </div>
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default ShowingMovieTab;
