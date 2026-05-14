/**
 * @fileoverview Presentation component for the Movie Edit page.
 */

import {ReactElement} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {MovieSubmitForm} from "../_feat/submit-movie/MovieSubmitForm.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {MovieEditHeader} from "@/views/admin/movies/edit-page/header.tsx";
import {MovieSubmitFormActions, MovieSubmitFormView} from "@/views/admin/movies/_feat/submit-movie";

/** Props for the MovieEditPageContent component. */
type ContentProps = {
    movie: Movie;
};

/**
 * Renders the primary layout and form for editing an existing movie.
 */
export function MovieEditPageContent(
    {movie}: ContentProps
): ReactElement {
    const navigate = useLoggedNavigate();
    const {slug, title} = movie;

    const successMessage = "Movie updated successfully.";
    const errorMessage = "Failed to submit movie data. Please try again.";

    const onSuccess = (updatedMovie: Movie) => {
        navigate({
            to: `/admin/movies/get/${updatedMovie.slug}`,
            component: MovieEditPageContent.name,
            message: "Navigation to profile after successful movie update."
        });
    };

    return (
        <PageFlexWrapper>
            <MovieEditHeader movieSlug={slug} movieTitle={title}/>

            <section>
                <SectionHeader srOnly={true}>Movie Edit Form</SectionHeader>

                <Card>
                    <CardContent className="p-4">
                        <MovieSubmitForm
                            editEntity={movie}
                            onSubmitSuccess={onSuccess}
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                        >
                            <div className="space-y-5">
                                <MovieSubmitFormView/>
                                <MovieSubmitFormActions/>
                            </div>
                        </MovieSubmitForm>
                    </CardContent>
                </Card>
            </section>
        </PageFlexWrapper>
    );
}
