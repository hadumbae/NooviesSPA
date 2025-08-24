import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieCreateHeader from "@/pages/movies/components/headers/MovieCreateHeader.tsx";
import MovieSubmitFormContainer from "@/pages/movies/components/admin/forms/MovieSubmitFormContainer.tsx";
import {useNavigate} from "react-router-dom";
import PageSection from "@/common/components/page/PageSection.tsx";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";

/**
 * Page component for creating a new movie in the admin interface.
 *
 * Renders a header, form container, and handles navigation upon successful creation.
 *
 * Uses {@link MovieSubmitFormContainer} to render the movie submission form,
 * and navigates to the newly created movie's detail page upon success.
 *
 * @example
 * ```tsx
 * <MovieCreatePage />
 * ```
 */
const MovieCreatePage: FC = () => {
    const navigate = useNavigate();

    /**
     * Callback executed when a movie is successfully created.
     * Navigates to the movie detail page.
     *
     * @param movie - The newly created movie object.
     */
    const onSuccess = ({ _id }: Movie) => {
        navigate(`/admin/movies/get/${_id}`);
    };

    const successMessage = "Movie created successfully.";
    const errorMessage = "Failed to submit movie data. Please try again.";

    return (
        <PageFlexWrapper>
            {/* Page header */}
            <MovieCreateHeader />

            {/* Movie form section */}
            <PageSection srTitle="Movie Create Form">
                <Card>
                    <CardContent className="p-4">
                        <MovieSubmitFormContainer
                            onSubmitSuccess={onSuccess}
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                        />
                    </CardContent>
                </Card>
            </PageSection>
        </PageFlexWrapper>
    );
};

export default MovieCreatePage;