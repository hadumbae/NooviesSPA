import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieDetailsHeader from "@/pages/movies/components/headers/admin/MovieDetailsHeader.tsx";
import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import MovieDetailsCard from "@/pages/movies/components/details/MovieDetailsCard.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import MovieDetailsBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MovieDetailsBreadcrumb.tsx";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import simplifyMovieDetails from "@/pages/movies/utility/simplifyMovieDetails.ts";
import useFetchMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import MovieDetailsCreditOverview from "@/pages/movies/components/details/MovieDetailsCreditOverview.tsx";
import {MovieCreditDetailsArraySchema} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.schema.ts";
import {MovieCreditDetailsArray} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.types.ts";

type MovieWithData = {
    movie: MovieDetails,
    credits: MovieCreditDetailsArray,
};

/**
 * Page component that renders detailed information about a specific movie.
 *
 * This component:
 * - Sets the document title to "Movie Details".
 * - Fetches movie ID from URL parameters via `useFetchMovieParams`.
 * - Loads movie data using `useFetchMovie` query hook.
 * - Handles loading states with `PageLoader`.
 * - Validates fetched movie data against `MovieDetailsSchema`.
 * - Displays breadcrumb navigation, header, and detailed movie card.
 *
 * It also simplifies movie details for the header using `simplifyMovieDetails`.
 *
 * @example
 * ```tsx
 * <MovieDetailsPage />
 * ```
 */
const MovieDetailsPage: FC = () => {
    // Set the document title for the page
    useTitle("Movie Details");

    // Fetch movie parameters from URL (e.g., movie ID)
    const movieParams = useFetchMovieParams();
    if (!movieParams) return <PageLoader/>;

    const {movieID} = movieParams;

    // Fetch movie data, including populated references and virtual fields
    const movieQuery = useFetchMovie({_id: movieID, populate: true, virtuals: true});

    const creditQuery = useFetchMovieCredits({
        movie: movieID,
        populate: true,
        virtuals: true,
        limit: 6,
        department: "CAST",
        sortByBillingOrder: "asc",
    });

    const queries = [movieQuery, creditQuery];
    const validationQueries: CombinedSchemaQuery[] = [
        {query: movieQuery, key: "movie", schema: MovieDetailsSchema},
        {query: creditQuery, key: "credits", schema: MovieCreditDetailsArraySchema},
    ];

    return (
        <CombinedQueryBoundary queries={queries}>
            <CombinedValidatedQueryBoundary queries={validationQueries}>
                {(data) => {
                    const {movie, credits} = data as MovieWithData;
                    const simplifiedMovie = simplifyMovieDetails(movie);

                    return (
                        <PageFlexWrapper>
                            <section>
                                <h1 className="sr-only">Movie Details Header</h1>
                                <MovieDetailsBreadcrumb/>
                                <MovieDetailsHeader movie={simplifiedMovie}/>
                            </section>

                            <PageSection srTitle="Movie Details Card">
                                <MovieDetailsCard movie={movie}/>
                            </PageSection>

                            <PageSection srTitle="Movie Credits Overview">
                                <MovieDetailsCreditOverview
                                    movieID={movie._id}
                                    credits={credits}
                                />
                            </PageSection>
                        </PageFlexWrapper>
                    );
                }}
            </CombinedValidatedQueryBoundary>
        </CombinedQueryBoundary>
    );
};

export default MovieDetailsPage;