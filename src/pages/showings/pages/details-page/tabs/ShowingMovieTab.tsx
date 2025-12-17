import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import { CombinedSchemaQuery } from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import { ShowingDetailsArraySchema } from "@/pages/showings/schema/showing/Showing.schema.ts";
import { MovieDetailsSchema } from "@/pages/movies/schema/movie/Movie.schema.ts";
import useFetchShowings from "@/pages/showings/hooks/queries/useFetchShowings.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import { ShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import ShowingMovieCard from "@/pages/showings/components/admin/card/showing-movie-card/ShowingMovieCard.tsx";
import ShowingSummaryCardList from "@/pages/showings/components/admin/card/showing-summary-card/ShowingSummaryCardList.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

type QueryParams = {
    movie: MovieDetails;
    showings: ShowingDetails[];
};

type TabProps = {
    /** Target movie ID used to fetch movie details and related showings */
    movieID: ObjectId;
};

/**
 * Admin tab displaying a movie overview with its recent showings.
 *
 * @remarks
 * - Fetches movie details and latest showings in parallel.
 * - Uses combined query boundaries for loading, error, and validation states.
 * - Limits showing results to the most recent 10 entries.
 */
const ShowingMovieTab = ({ movieID }: TabProps) => {
    // --- Movie Query ---
    const movieQuery = useFetchMovie({
        _id: movieID,
        populate: true,
        virtuals: true,
    });

    // --- Showing Query ---
    const showingQuery = useFetchShowings({
        queries: {
            movie: movieID,
            sortByStartTime: -1,
            populate: true,
            virtuals: true,
            limit: 10,
        },
    });

    // --- Query Aggregation ---
    const queries = [movieQuery, showingQuery];

    // --- Schema Validation ---
    const queryValidation: CombinedSchemaQuery[] = [
        { query: movieQuery, schema: MovieDetailsSchema, key: "movie" },
        { query: showingQuery, schema: ShowingDetailsArraySchema, key: "showings" },
    ];

    // --- Render ---
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
