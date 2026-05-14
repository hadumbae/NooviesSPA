/**
 * @fileoverview Main page component for the movie creation interface.
 * Orchestrates the submission form, breadcrumb navigation, and post-creation
 * redirection logic.
 */

import {ReactElement} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {MovieSubmitForm} from "../_feat/submit-movie/MovieSubmitForm.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {MovieCreatePageHeader} from "@/views/admin/movies/create-page/header.tsx";
import {MovieSubmitFormActions, MovieSubmitFormView} from "@/views/admin/movies/_feat/submit-movie";

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
            <MovieCreatePageHeader/>

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