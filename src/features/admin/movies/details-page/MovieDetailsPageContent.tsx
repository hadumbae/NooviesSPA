import {FC} from 'react';
import simplifyMovieDetails from "@/pages/movies/utility/simplifyMovieDetails.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {MovieDetailsUIContext} from "@/pages/movies/context/MovieDetailsUIContext.ts";
import MovieDetailsOptions from "@/pages/movies/components/admin/movie-details/MovieDetailsOptions.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {Ellipsis} from "lucide-react";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MovieSubmitFormPanel from "@/pages/movies/components/forms/MovieSubmitFormPanel.tsx";
import MoviePosterImageSubmitFormPanel
    from "@/pages/movies/components/forms/poster-image/MoviePosterImageSubmitFormPanel.tsx";
import MovieDeleteWarningDialog from "@/pages/movies/components/dialog/MovieDeleteWarningDialog.tsx";
import MoviePosterImageDeleteDialog
    from "@/pages/movies/components/admin/poster-image/MoviePosterImageDeleteDialog.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieDetailsBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MovieDetailsBreadcrumb.tsx";
import MovieDetailsHeader from "@/pages/movies/components/headers/admin/MovieDetailsHeader.tsx";
import MovieDetailsCard from "@/pages/movies/components/details/MovieDetailsCard.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {RefetchFunction} from "@/common/type/query/RefetchFunction.ts";
import MovieDetailsPageTabs from "@/features/admin/movies/details-page/tabs/MovieDetailsPageTabs.tsx";

/**
 * Props for {@link MovieDetailsPageContent}.
 */
export type MovieDetailsPageContentProps = {
    /** Full movie details */
    movie: MovieDetails;

    /** Refetches movie data */
    refetchMovie: RefetchFunction;
};

/**
 * Admin movie details page content.
 *
 * Renders movie metadata, credits, and admin controls,
 * with hidden panels driven by UI context state.
 *
 * @param props Component props
 */
const MovieDetailsPageContent: FC<MovieDetailsPageContentProps> = (props) => {
    // --- STATE ---
    const {movie, refetchMovie} = props;
    const simplifiedMovie = simplifyMovieDetails(movie);
    const hasPoster = Boolean(movie.posterImage);

    // --- REFETCH ---
    const onPosterUpdate = () => refetchMovie();

    // --- UI CONTEXT ---
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

    // --- RENDER ---
    return (
        <PageFlexWrapper>
            <section className="flex flex-col">
                <SectionHeader srOnly>Movie Details Header</SectionHeader>

                <div className="flex justify-between items-center">
                    <MovieDetailsBreadcrumb/>

                    <MovieDetailsOptions slug={movie.slug} hasPoster={hasPoster}>
                        <IconButton>
                            <Ellipsis/>
                        </IconButton>
                    </MovieDetailsOptions>
                </div>

                <MovieDetailsHeader movie={movie}/>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div>
                    <SectionHeader srOnly>Details & Credits</SectionHeader>
                    <MovieDetailsCard movie={movie}/>
                </div>

                <MovieDetailsPageTabs
                    className="2xl:col-span-2"
                    movie={movie}
                />
            </section>

            {/* Edit Panel */}
            <section className="hidden">
                <SectionHeader srOnly>Edit Movie Details Panel</SectionHeader>
                <MovieSubmitFormPanel
                    isEditing
                    entity={simplifiedMovie}
                    presetOpen={isEditing}
                    setPresetOpen={setIsEditing}
                />
            </section>

            {/* Poster Panel */}
            <section className="hidden">
                <MoviePosterImageSubmitFormPanel
                    movieID={movie._id}
                    presetOpen={isUpdatingPoster}
                    setPresetOpen={setIsUpdatingPoster}
                    onSubmitSuccess={onPosterUpdate}
                />
            </section>

            {/* Delete Movie */}
            <section className="hidden">
                <MovieDeleteWarningDialog
                    movieID={movie._id}
                    presetOpen={isDeleting}
                    setPresetOpen={setIsDeleting}
                />
            </section>

            {/* Delete Poster */}
            <section className="hidden">
                <MoviePosterImageDeleteDialog
                    movieID={movie._id}
                    presetOpen={isDeletingPoster}
                    setPresetOpen={setIsDeletingPoster}
                    onDeleteSuccess={onPosterUpdate}
                />
            </section>
        </PageFlexWrapper>
    );
};

export default MovieDetailsPageContent;
