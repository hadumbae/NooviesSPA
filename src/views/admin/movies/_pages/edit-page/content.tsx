/**
 * @fileoverview Presentation component for the Movie Edit page.
 */

import {ReactElement} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {MovieSubmitForm, MovieSubmitFormActions, MovieSubmitFormView} from "@/views/admin/movies/_feat/submit-movie";
import {PageHeader} from "@/views/common/_comp";
import {MovieEditBreadcrumbs} from "@/views/admin/movies";

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

    const successMessage = "Updated..";
    const errorMessage = "Failed to update. Please try again.";

    const onSuccess = (updatedMovie: Movie) => {
        navigate({
            to: `/admin/movies/get/${updatedMovie.slug}`,
            component: MovieEditPageContent.name,
            message: "Navigation to profile after successful movie update."
        });
    };

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Edit Movies"
                description={`Edit • ${title}`}
                breadcrumbs={<MovieEditBreadcrumbs movieSlug={slug} movieTitle={title}/>}
            />

            <section>
                <SROnly text="Movie Edit Form"/>

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
