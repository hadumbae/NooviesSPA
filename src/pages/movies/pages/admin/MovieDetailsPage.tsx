import {FC} from "react";
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
import MoviePosterImageDeleteDialog
    from "@/pages/movies/components/admin/poster-image/MoviePosterImageDeleteDialog.tsx";

/**
 * Represents detailed movie data along with its associated credits.
 */
type MovieWithData = {
    /** The validated and fetched detailed movie entity. */
    movie: MovieDetails;

    /** List of validated credit entries (cast and/or crew) associated with the movie. */
    credits: MovieCreditDetailsArray;
};

/**
 * Renders the **Movie Details Page**, showing complete information about a specific movie,
 * including its metadata, poster, and top-billed cast/crew.
 *
 * @remarks
 * This component:
 * - Dynamically sets the document title to `"Movie Details"`.
 * - Extracts the movie ID from URL parameters via `useFetchMovieParams`.
 * - Fetches:
 *   - Movie details (`useFetchMovie`) with populated references.
 *   - Movie credits (`useFetchMovieCredits`) for the first six billed cast members.
 * - Combines both queries with `CombinedQueryBoundary` and validates them using
 *   `CombinedValidatedQueryBoundary` against `MovieDetailsSchema` and `MovieCreditDetailsArraySchema`.
 * - On success, simplifies movie data for header display and renders:
 *   - `MovieDetailsBreadcrumb` navigation,
 *   - `MovieDetailsHeader` (title, release info, etc.),
 *   - `MovieDetailsCard` (core metadata),
 *   - `MovieDetailsCreditOverview` (cast list preview).
 * - Also contains hidden form sections and dialogs for editing, updating, or deleting
 *   movie and poster data via contextual UI controls.
 *
 * @component
 * @example
 * ```tsx
 * <MovieDetailsPage />
 * ```
 */
const MovieDetailsPage: FC = () => {
    // — Document setup —
    useTitle("Movie Details");

    // — URL parameter extraction —
    const movieParams = useFetchMovieParams();
    if (!movieParams) return <PageLoader/>;
    const {movieID} = movieParams;

    // — Queries —
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

    // — Validation setup —
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
                        const hasPoster = Boolean(movie.posterImage);

                        // — Refresh poster data when updated —
                        const {refetch: refetchMovie} = movieQuery;
                        const onPosterUpdate = () => refetchMovie();

                        // — Context state —
                        const {
                            isEditing,
                            setIsEditing,
                            isUpdatingPoster,
                            setIsUpdatingPoster,
                            isDeleting,
                            setIsDeleting,
                            isDeletingPoster,
                            setIsDeletingPoster,
                        } = useRequiredContext({context: MovieDetailsUIContext});

                        // — Option menu (ellipsis button) —
                        const options = (
                            <MovieDetailsOptions movieID={movie._id} hasPoster={hasPoster}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="text-neutral-400 hover:text-black rounded-3xl"
                                >
                                    <Ellipsis/>
                                </Button>
                            </MovieDetailsOptions>
                        );

                        // — Hidden edit, poster, and delete modals —
                        const hiddenEditSection = (
                            <section className="hidden">
                                <SectionHeader srOnly>Edit Movie Details Panel</SectionHeader>
                                <MovieSubmitFormPanel
                                    isEditing
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
                                    presetOpen={isUpdatingPoster}
                                    setPresetOpen={setIsUpdatingPoster}
                                    onSubmitSuccess={onPosterUpdate}
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

                        const hiddenDeletingPosterSection = (
                            <section className="hidden">
                                <MoviePosterImageDeleteDialog
                                    movieID={movie._id}
                                    presetOpen={isDeletingPoster}
                                    setPresetOpen={setIsDeletingPoster}
                                    onDeleteSuccess={onPosterUpdate}
                                />
                            </section>
                        );

                        // — Render layout —
                        return (
                            <PageFlexWrapper>
                                <section className="flex flex-col">
                                    <SectionHeader srOnly>Movie Details Header</SectionHeader>

                                    <div className="flex justify-between items-center">
                                        <MovieDetailsBreadcrumb/>
                                        {options}
                                    </div>

                                    <MovieDetailsHeader movie={movie}/>
                                </section>

                                <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                                    <SectionHeader srOnly>Details & Credits</SectionHeader>

                                    <section>
                                        <SectionHeader srOnly>Movie Details Card</SectionHeader>
                                        <MovieDetailsCard movie={movie}/>
                                    </section>

                                    <section className="2xl:col-span-2">
                                        <SectionHeader srOnly>Movie Credits Overview</SectionHeader>
                                        <MovieDetailsCreditOverview movieID={movie._id} credits={credits}/>
                                    </section>

                                    {hiddenEditSection}
                                    {hiddenPosterSection}
                                    {hiddenDeletingSection}
                                    {hiddenDeletingPosterSection}
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
