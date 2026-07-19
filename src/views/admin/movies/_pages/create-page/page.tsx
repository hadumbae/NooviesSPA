/**
 * @fileoverview Main page component for the movie creation interface.
 * Orchestrates the submission form, breadcrumb navigation, and post-creation
 * redirection logic.
 */

import {ReactElement} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {MovieSubmitForm} from "@/views/admin/movies/_feat/submit-movie/MovieSubmitForm.tsx";
import {Card, CardContent} from "@/views/common/_comp/ui/card.tsx";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {Movie} from "@/domains/movies/_schema/movie/MovieSchema.ts";
import {MovieSubmitFormActions, MovieSubmitFormView} from "@/views/admin/movies/_feat/submit-movie";
import {PageHeader} from "@/views/common/_comp";
import {MovieCreatePageBreadcrumbs} from "@/views/admin/movies";

/**
 * Administrative page for registering new movies.
 */
export function MovieCreatePage(): ReactElement {
    const navigate = useLoggedNavigate();

    const onSuccess = ({slug}: Movie) => {
        navigate({
            to: `/admin/movies/get/${slug}`,
            component: MovieCreatePage.name,
            message: "Automatic redirect after successful movie creation."
        });
    };

    const successMessage = "Movie created.";
    const errorMessage = "Failed to create. Please try again.";

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Create Movies"
                description="Enter details and press on `Submit` to create movies."
                breadcrumbs={<MovieCreatePageBreadcrumbs/>}
            />

            <Card>
                <CardContent className="p-4">
                    <MovieSubmitForm
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
        </PageFlexWrapper>
    );
}