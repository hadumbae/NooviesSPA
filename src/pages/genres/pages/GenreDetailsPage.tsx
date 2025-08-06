// TODO - Movies By Genre
import {FC, ReactElement} from 'react';
import useFetchGenre from "@/pages/genres/hooks/useFetchGenre.ts";
import useFetchGenreParams from "@/pages/genres/hooks/useFetchGenreParams.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import GenreDetailsHeader from "@/pages/genres/components/pages/genre-details/GenreDetailsHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {GenreDetailsSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import GenreDetailsCard from "@/pages/genres/components/pages/genre-details/GenreDetailsCard.tsx";
import GenreDetailsBreadcrumbs from "@/pages/genres/components/pages/genre-details/GenreDetailsBreadcrumbs.tsx";

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
const GenreDetailsPage: FC = (): ReactElement => {
    useTitle("Genre Details");

    const {genreID} = useFetchGenreParams();
    const genreQuery = useFetchGenre({_id: genreID!, virtuals: true});

    return (
        <QueryBoundary query={genreQuery}>
            <ValidatedQueryBoundary query={genreQuery} schema={GenreDetailsSchema}>
                {(genre: GenreDetails) => {
                    const {} = genre;
                    useTitle(genre.name);

                    return (
                        <PageFlexWrapper>
                            <GenreDetailsBreadcrumbs genreName={genre.name} />
                            <GenreDetailsHeader genre={genre}/>

                            <PageSection srTitle="Genre Details">
                                <GenreDetailsCard genre={genre} />
                            </PageSection>

                            <PageSection title="Movies">
                                Movies By Genre
                            </PageSection>
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default GenreDetailsPage;
