/**
 * @fileoverview Presentation component for the Movie Details page.
 * Orchestrates movie metadata display, tabbed content, and administrative
 * overlays for editing, poster management, and deletion.
 */

import {ReactElement} from 'react';
import simplifyMovieDetails from "@/domains/movies/utility/simplifyMovieDetails.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MovieSubmitFormPanel from "@/views/admin/movies/_feat/submit-movie/MovieSubmitFormPanel.tsx";
import MoviePosterImageSubmitFormPanel
    from "@/views/admin/movies/_feat/submit-poster-image/MoviePosterImageSubmitFormPanel.tsx";
import MoviePosterImageDeleteDialog
    from "@/views/admin/movies/_feat/delete-poster-image/MoviePosterImageDeleteDialog.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {RefetchFunction} from "@/common/type/query/RefetchFunction.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsHeader} from "@/views/admin/movies/details-page/header.tsx";
import {MovieDetailsPageTabs} from "@/views/admin/movies/details-page/tabs/tabs.tsx";
import {MovieDeleteWarningDialog} from "@/views/admin/movies/_feat/delete-movie";
import {MovieDetailsCard} from "@/views/admin/movies/_comp/details-display";
import {MovieDetailsUIContext} from "@/domains/movies/context/details-ui";

export type MovieDetailsPageContentProps = {
    movie: MovieDetails;
    refetchMovie: RefetchFunction;
};

/**
 * Renders the primary administrative view for a specific movie.
 */
export function MovieDetailsPageContent(
    props: MovieDetailsPageContentProps
): ReactElement {
    const {movie, refetchMovie} = props;
    const simplifiedMovie = simplifyMovieDetails(movie);

    const onPosterUpdate = () => refetchMovie();

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

    return (
        <PageFlexWrapper>
            <MovieDetailsHeader movie={movie}/>

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

            <section className="hidden">
                <SectionHeader srOnly>Edit Movie Details Panel</SectionHeader>
                <MovieSubmitFormPanel
                    isEditing
                    entity={simplifiedMovie}
                    presetOpen={isEditing}
                    setPresetOpen={setIsEditing}
                />
            </section>

            <section className="hidden">
                <MoviePosterImageSubmitFormPanel
                    movieID={movie._id}
                    presetOpen={isUpdatingPoster}
                    setPresetOpen={setIsUpdatingPoster}
                    onSubmitSuccess={onPosterUpdate}
                />
            </section>

            <section className="hidden">
                <MovieDeleteWarningDialog
                    movieID={movie._id}
                    isOpen={isDeleting}
                    setIsOpen={setIsDeleting}
                />
            </section>

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
}