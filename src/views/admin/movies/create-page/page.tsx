/**
 * @fileoverview Main page component for the movie creation interface.
 * Orchestrates the submission form, breadcrumb navigation, and post-creation
 * redirection logic.
 */

import {FC} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import MovieSubmitFormContainer from "@/views/admin/movies/_feat/submit-movie/MovieSubmitFormContainer.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {MovieCreatePageHeader} from "@/views/admin/movies/create-page/header.tsx";

/**
 * Administrative page for registering new movies.
 */
const MovieCreatePage: FC = () => {
    const navigate = useLoggedNavigate();

    const onSuccess = ({slug}: Movie) => {
        navigate({
            to: `/admin/movies/get/${slug}`,
            component: MovieCreatePage.name,
            message: "Automatic redirect after successful movie creation."
        });
    };

    const successMessage = "Movie created successfully.";
    const errorMessage = "Failed to submit movie data. Please try again.";

    return (
        <PageFlexWrapper>
            <MovieCreatePageHeader/>

            <Card>
                <CardContent className="p-4">
                    <MovieSubmitFormContainer
                        onSubmitSuccess={onSuccess}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                </CardContent>
            </Card>
        </PageFlexWrapper>
    );
};

export default MovieCreatePage;