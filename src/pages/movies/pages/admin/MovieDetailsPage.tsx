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
import useFetchMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import MovieDetailsCreditOverview from "@/pages/movies/components/details/MovieDetailsCreditOverview.tsx";
import {MovieCreditDetailsArraySchema} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.schema.ts";
import {MovieCreditDetailsArray} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MoviePosterImageSubmitFormPanel
    from "@/pages/movies/components/forms/poster-image/MoviePosterImageSubmitFormPanel.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import MovieDetailsUIContextProvider from "@/pages/movies/components/providers/MovieDetailsUIContextProvider.tsx";
import {Ellipsis} from "lucide-react";
import MovieDetailsOptions from "@/pages/movies/components/admin/movie-details/MovieDetailsOptions.tsx";
import MovieSubmitFormPanel from "@/pages/movies/components/forms/MovieSubmitFormPanel.tsx";
import simplifyMovieDetails from "@/pages/movies/utility/simplifyMovieDetails.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {MovieDetailsUIContext} from "@/pages/movies/context/MovieDetailsUIContext.ts";
import MovieDeleteWarningDialog from "@/pages/movies/components/dialog/MovieDeleteWarningDialog.tsx";

/**
 * Type representing a movie along with its fetched credits.
 */
type MovieWithData = {
    /** The detailed movie data. */
    movie: MovieDetails;

    /** Array of credits (cast/crew) associated with the movie. */
    credits: MovieCreditDetailsArray;
};

/**
 * Page component that renders detailed information about a specific movie.
 *
 * @remarks
 * This component performs the following tasks:
 * - Sets the document title to "Movie Details" using `useTitle`.
 * - Fetches the movie ID from URL parameters via `useFetchMovieParams`.
 * - Fetches movie data using `useFetchMovie` and movie credits using `useFetchMovieCredits`.
 * - Handles loading states with `PageLoader`.
 * - Validates fetched movie data and credits using `CombinedValidatedQueryBoundary` against
 *   `MovieDetailsSchema` and `MovieCreditDetailsArraySchema`.
 * - Simplifies movie details for display in the header using `simplifyMovieDetails`.
 * - Displays:
 *   - Breadcrumb navigation (`MovieDetailsBreadcrumb`),
 *   - Header section (`MovieDetailsHeader`),
 *   - Detailed movie card (`MovieDetailsCard`),
 *   - Credit overview section (`MovieDetailsCreditOverview`).
 *
 * @example
 * ```tsx
 * <MovieDetailsPage />
 * ```
 */
const MovieDetailsPage: FC = () => {
    // Set the document title
    useTitle("Movie Details");

    // Fetch movie parameters from URL (e.g., movie ID)
    const movieParams = useFetchMovieParams();
    if (!movieParams) return <PageLoader/>;

    const {movieID} = movieParams;

    // Fetch movie data with populated references and virtuals
    const movieQuery = useFetchMovie({_id: movieID, populate: true, virtuals: true});

    // Fetch first 6 cast credits, sorted by billing order
    const creditQuery = useFetchMovieCredits({
        movie: movieID,
        populate: true,
        virtuals: true,
        limit: 6,
        department: "CAST",
        sortByBillingOrder: "asc",
    });

    const queries = [movieQuery, creditQuery];

    // Validate fetched data against schemas
    const validationQueries: CombinedSchemaQuery[] = [
        {query: movieQuery, key: "movie", schema: MovieDetailsSchema},
        {query: creditQuery, key: "credits", schema: MovieCreditDetailsArraySchema},
    ];

    return (
        <MovieDetailsUIContextProvider>
            <CombinedQueryBoundary queries={queries}>
                <CombinedValidatedQueryBoundary queries={validationQueries}>
                    {(data) => {
                        const {movie, credits} = data as MovieWithData;
                        const simplifiedMovie = simplifyMovieDetails(movie);

                        const {
                            isEditing,
                            setIsEditing,
                            isUpdatingPoster,
                            setIsUpdatingPoster,
                            isDeleting,
                            setIsDeleting,
                        } = useRequiredContext({context: MovieDetailsUIContext});

                        const options = (
                            <MovieDetailsOptions movieID={movie._id}>
                                <Button variant="outline" size="icon" className="text-neutral-400 hover:text-black rounded-3xl">
                                    <Ellipsis/>
                                </Button>
                            </MovieDetailsOptions>
                        );

                        const hiddenEditSection = (
                            <section className="hidden">
                                <SectionHeader srOnly={true}>Edit Movie Details Panel</SectionHeader>
                                <MovieSubmitFormPanel
                                    isEditing={true}
                                    entity={simplifiedMovie}
                                    presetOpen={isEditing}
                                    setPresetOpen={setIsEditing}
                                />
                            </section>
                        );

                        const hiddenPosterSection = (
                            <section className="hidden">
                                <MoviePosterImageSubmitFormPanel
                                    movieID={movie._id}
                                    posterImage={movie.posterImage}
                                    presetOpen={isUpdatingPoster}
                                    setPresetOpen={setIsUpdatingPoster}
                                />
                            </section>
                        );

                        const hiddenDeletingSection = (
                            <section className="hidden">
                                <MovieDeleteWarningDialog
                                    movieID={movie._id}
                                    presetOpen={isDeleting}
                                    setPresetOpen={setIsDeleting}
                                />
                            </section>
                        );

                        return (
                            <PageFlexWrapper>
                                <section className="flex flex-col">
                                    <SectionHeader srOnly={true}>Movie Details Header</SectionHeader>

                                    <div className="flex justify-between items-center">
                                        <MovieDetailsBreadcrumb/>
                                        {options}
                                    </div>

                                    <MovieDetailsHeader movie={movie}/>
                                </section>

                                <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                                    <SectionHeader srOnly={true}>Details & Credits</SectionHeader>

                                    <section>
                                        <SectionHeader srOnly={true}>Movie Details Card</SectionHeader>
                                        <MovieDetailsCard movie={movie}/>
                                    </section>

                                    <section className="2xl:col-span-2">
                                        <SectionHeader srOnly={true}>Movie Credits Overview</SectionHeader>
                                        <MovieDetailsCreditOverview movieID={movie._id} credits={credits}/>
                                    </section>

                                    {hiddenEditSection}
                                    {hiddenPosterSection}
                                    {hiddenDeletingSection}
                                </section>
                            </PageFlexWrapper>
                        );
                    }}
                </CombinedValidatedQueryBoundary>
            </CombinedQueryBoundary>
        </MovieDetailsUIContextProvider>
    );
};

export default MovieDetailsPage;
