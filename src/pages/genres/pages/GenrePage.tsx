import {FC, ReactElement} from 'react';
import useFetchGenre from "@/pages/genres/hooks/useFetchGenre.ts";
import useFetchGenreParams from "@/pages/genres/hooks/useFetchGenreParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/PageError.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import GenreDetailsHeader from "@/pages/genres/components/headers/GenreDetailsHeader.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";

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
    const {genreID} = useFetchGenreParams();
    const {data: genre, isPending, isError, error} = useFetchGenre({_id: genreID!});

    if (isPending) return <PageLoader />
    if (isError) return  <PageError error={error} />

    const {description} = genre;

    return (
        <PageFlexWrapper>
            {/* Header */}
            <GenreDetailsHeader genre={genre} />

            {/*Description*/}
            <section>
                <TextQuote>{description}</TextQuote>
            </section>

            {/* TODO Paginated Movies */}
            <section>
                <HeaderTitle className="text-xl">Movies TODO</HeaderTitle>
            </section>
        </PageFlexWrapper>
    );
};

export default GenrePage;
