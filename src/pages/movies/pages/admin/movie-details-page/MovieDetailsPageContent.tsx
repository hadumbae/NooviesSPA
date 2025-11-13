import { FC } from 'react';
import simplifyMovieDetails from "@/pages/movies/utility/simplifyMovieDetails.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { MovieDetailsUIContext } from "@/pages/movies/context/MovieDetailsUIContext.ts";
import MovieDetailsOptions from "@/pages/movies/components/admin/movie-details/MovieDetailsOptions.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import { Ellipsis } from "lucide-react";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MovieSubmitFormPanel from "@/pages/movies/components/forms/MovieSubmitFormPanel.tsx";
import MoviePosterImageSubmitFormPanel from "@/pages/movies/components/forms/poster-image/MoviePosterImageSubmitFormPanel.tsx";
import MovieDeleteWarningDialog from "@/pages/movies/components/dialog/MovieDeleteWarningDialog.tsx";
import MoviePosterImageDeleteDialog from "@/pages/movies/components/admin/poster-image/MoviePosterImageDeleteDialog.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieDetailsBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MovieDetailsBreadcrumb.tsx";
import MovieDetailsHeader from "@/pages/movies/components/headers/admin/MovieDetailsHeader.tsx";
import MovieDetailsCard from "@/pages/movies/components/details/MovieDetailsCard.tsx";
import MovieDetailsCreditOverview from "@/pages/movies/components/details/MovieDetailsCreditOverview.tsx";
import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import { MovieCreditDetailsArray } from "@/pages/moviecredit/schemas/model/MovieCreditExtended.types.ts";
import { RefetchFunction } from "@/common/type/query/RefetchFunction.ts";

/**
 * Props for the `MovieDetailsPageContent` component.
 */
export type MovieDetailsPageContentProps = {
    /**
     * The full details of the movie.
     */
    movie: MovieDetails;

    /**
     * Array of credits associated with the movie.
     */
    credits: MovieCreditDetailsArray;

    /**
     * A function to refetch the movie details from the backend.
     */
    refetchMovie: RefetchFunction;
};

/**
 * Displays the main content of the Movie Details page in the admin interface.
 *
 * Features:
 * - Header section with breadcrumbs and options menu.
 * - Movie details card and credits overview.
 * - Hidden panels for editing movie details, updating poster, deleting movie, and deleting poster.
 * - Integrates with context to manage editing, updating, and deleting states.
 *
 * @param props - Props containing `movie`, `credits`, and `refetchMovie`.
 *
 * @returns A React component displaying movie details and admin controls.
 *
 * @example
 * ```tsx
 * <MovieDetailsPageContent
 *   movie={movie}
 *   credits={credits}
 *   refetchMovie={refetchMovieFunction}
 * />
 * ```
 */
const MovieDetailsPageContent: FC<MovieDetailsPageContentProps> = (props) => {
    // ⚡ State ⚡

    const { movie, credits, refetchMovie } = props;
    const simplifiedMovie = simplifyMovieDetails(movie);
    const hasPoster = Boolean(movie.posterImage);

    // ⚡ Refetch Movies ⚡

    const onPosterUpdate = () => refetchMovie();

    // ⚡ UI Context ⚡

    const {
        isEditing,
        setIsEditing,
        isUpdatingPoster,
        setIsUpdatingPoster,
        isDeleting,
        setIsDeleting,
        isDeletingPoster,
        setIsDeletingPoster,
    } = useRequiredContext({ context: MovieDetailsUIContext });

    // ⚡ Movie Options ⚡

    const options = (
        <MovieDetailsOptions movieID={movie._id} hasPoster={hasPoster}>
            <IconButton>
                <Ellipsis />
            </IconButton>
        </MovieDetailsOptions>
    );

    // ⚡ Hidden Sections ⚡

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

    return (
        <PageFlexWrapper>
            <section className="flex flex-col">
                <SectionHeader srOnly>Movie Details Header</SectionHeader>

                <div className="flex justify-between items-center">
                    <MovieDetailsBreadcrumb />
                    {options}
                </div>

                <MovieDetailsHeader movie={movie} />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                <SectionHeader srOnly>Details & Credits</SectionHeader>

                <MovieDetailsCard movie={movie} />

                <div className="2xl:col-span-2">
                    <MovieDetailsCreditOverview movieID={movie._id} credits={credits} />
                </div>
            </section>

            {isEditing && hiddenEditSection}
            {isUpdatingPoster && hiddenPosterSection}
            {isDeleting && hiddenDeletingSection}
            {isDeletingPoster && hiddenDeletingPosterSection}

        </PageFlexWrapper>
    );
};

export default MovieDetailsPageContent;
