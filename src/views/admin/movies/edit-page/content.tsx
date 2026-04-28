/**
 * @fileoverview Presentation component for the Movie Edit page.
 * Provides the layout for the movie editing form, passing existing movie
 * data to the form container and handling post-update redirection.
 */

import {ReactElement} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import MovieSubmitFormContainer from "@/views/admin/movies/_feat/submit-movie/MovieSubmitFormContainer.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {MovieEditHeader} from "@/views/admin/movies/edit-page/header.tsx";

type ContentProps = {
    movie: Movie;
};

/**
 * Renders the primary content area for editing a movie.
 */
export function MovieEditPageContent(
    {movie}: ContentProps
): ReactElement {
    const navigate = useLoggedNavigate();
    const {_id, title} = movie;

    const successMessage = "Movie updated successfully.";
    const errorMessage = "Failed to submit movie data. Please try again.";

    const onSuccess = ({slug}: Movie) => {
        navigate({
            to: `/admin/movies/get/${slug}`,
            component: MovieEditPageContent.name,
            message: "Navigation to profile after successful movie update."
        });
    };

    return (
        <PageFlexWrapper>
            <MovieEditHeader movieID={_id} movieTitle={title} />

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
}