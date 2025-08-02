import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import GenreSubmitFormContainer from "@/pages/genres/components/form/GenreSubmitFormContainer.tsx";
import {useNavigate} from "react-router-dom";
import GenreCreateHeader from "@/pages/genres/components/pages/create-genre/GenreCreateHeader.tsx";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import GenreCreateBreadcrumbs from "@/pages/genres/components/pages/create-genre/GenreCreateBreadcrumbs.tsx";

/**
 * Page component for creating a new genre.
 *
 * This page includes:
 * - **Breadcrumbs** (`GenreCreateBreadcrumbs`) for navigation context.
 * - **Header** (`GenreCreateHeader`) describing the page purpose.
 * - **Form** (`GenreSubmitFormContainer`) for creating a genre.
 * - **Cancel button** (`ButtonLink`) to return to the genres index.
 *
 * On successful form submission, the user is redirected to the detail view
 * of the newly created genre.
 *
 * @example
 * ```tsx
 * <Route path="/admin/genres/create" element={<GenreCreatePage />} />
 * ```
 */
const GenreCreatePage: FC = () => {
    const navigate = useNavigate();
    const onGenreSubmit = (genre: Genre) => {
        navigate(`/admin/genres/get/${genre._id}`);
    }

    return (
        <PageFlexWrapper className="max-md:space-y-2 space-y-10">
            <GenreCreateBreadcrumbs />
            <GenreCreateHeader/>

            <section className="flex justify-center">
                <div className="max-md:w-full w-1/2 space-y-2">
                    <GenreSubmitFormContainer onSubmitSuccess={onGenreSubmit}/>

                    <ButtonLink to="/admin/genres" variant="secondary" className="w-full">
                        Cancel
                    </ButtonLink>
                </div>
            </section>
        </PageFlexWrapper>
    );
};

export default GenreCreatePage;
