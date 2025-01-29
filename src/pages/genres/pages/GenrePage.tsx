// TODO - Movies By Genre
import {FC, ReactElement} from 'react';
import useFetchGenre from "@/pages/genres/hooks/useFetchGenre.ts";
import useFetchGenreParams from "@/pages/genres/hooks/useFetchGenreParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import GenreDetailsHeader from "@/pages/genres/components/headers/GenreDetailsHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import GenreDescriptionCard from "@/pages/genres/components/cards/GenreDescriptionCard.tsx";

/**
 * A React component that serves as a page for displaying detailed information
 * about a specific `Genre`. This component is designed to work with React Router
 * and fetches genre data based on the route parameters.
 *
 * @component
 *
 * @example
 * // Example usage in React Router:
 * <Route path="/genres/:genreID" element={<GenrePage />} />
 *
 * @description
 * - The `GenrePage` component loads the genre using the `genreID` URL param.
 * - It returns a loader while fetching and shows an error if one occurs.
 * - It displays basic information about the genre.
 * - Includes a TODO section for displaying a paginated list of movies.
 *
 * @returns {React.ReactElement} The genre details page.
 */
const GenrePage: FC = (): ReactElement => {
    useTitle("Genre Details");

    const {genreID} = useFetchGenreParams();
    const {data: genre, isPending, isError, error} = useFetchGenre({_id: genreID!});

    useTitle(genre?.name);

    if (isPending) return <PageLoader />
    if (isError) return  <PageError error={error} />

    return (
        <PageFlexWrapper>
            <GenreDetailsHeader genre={genre} />

            <PageSection title="Description">
                <GenreDescriptionCard genre={genre} />
            </PageSection>

            <PageSection title="Movies">
                Movies By Genre
            </PageSection>
        </PageFlexWrapper>
    );
};

export default GenrePage;
