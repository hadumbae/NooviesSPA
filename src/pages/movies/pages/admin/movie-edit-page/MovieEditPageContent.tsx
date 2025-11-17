import { FC } from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import MovieSubmitFormContainer from "@/pages/movies/components/forms/MovieSubmitFormContainer.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import { Movie } from "@/pages/movies/schema/movie/Movie.types.ts";
import MovieEditBreadcrumbs from "@/pages/movies/components/pages/admin/edit-movie/MovieEditBreadcrumbs.tsx";
import MovieEditHeader from "@/pages/movies/components/pages/admin/edit-movie/MovieEditHeader.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

/**
 * Props for {@link MovieEditPageContent}.
 */
type ContentProps = {
    /** The movie object being edited. */
    movie: Movie;
};

/**
 * Page-level component responsible for rendering the full "Edit Movie" interface.
 *
 * This component composes:
 * - **Breadcrumb navigation** via {@link MovieEditBreadcrumbs}
 * - **Page header** showing the movie title via {@link MovieEditHeader}
 * - **Movie edit form** via {@link MovieSubmitFormContainer}
 *
 * It also integrates logged navigation using {@link useLoggedNavigate} to direct
 * the user to the movie detail page after a successful update.
 *
 * @param movie - The movie data used to populate the edit form.
 *
 * @example
 * ```tsx
 * <MovieEditPageContent movie={movie} />
 * ```
 */
const MovieEditPageContent: FC<ContentProps> = ({ movie }) => {
    const navigate = useLoggedNavigate();
    const { _id, title } = movie;

    // ⚡ Sheet Configuration ⚡

    const successMessage = "Movie updated successfully.";
    const errorMessage = "Failed to submit movie data. Please try again.";

    // ⚡ On Success Handler ⚡

    /**
     * Callback executed when a movie is successfully updated.
     *
     * Redirects the user to the movie detail page while logging navigation metadata.
     *
     * @param movie - The updated movie object containing the new ID value.
     */
    const onSuccess = ({ _id }: Movie) => {
        navigate({
            to: `/admin/movies/get/${_id}`,
            component: MovieEditPageContent.name,
            message: "Navigation on movie editing."
        });
    };

    // ⚡ Render ⚡

    return (
        <PageFlexWrapper>
            {/* Movie Edit Header & Breadcrumbs */}
            <section className="space-y-2">
                <SectionHeader srOnly={true}>Header And Breadcrumbs</SectionHeader>

                <MovieEditBreadcrumbs movieID={_id} movieTitle={title} />
                <MovieEditHeader movieTitle={title} />
            </section>

            {/* Movie Edit Form */}
            <section>
                <SectionHeader srOnly={true}>Movie Edit Form</SectionHeader>

                <Card>
                    <CardContent className="p-4">
                        <MovieSubmitFormContainer
                            isEditing={true}
                            entity={movie}
                            onSubmitSuccess={onSuccess}
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                        />
                    </CardContent>
                </Card>
            </section>
        </PageFlexWrapper>
    );
};

export default MovieEditPageContent;
