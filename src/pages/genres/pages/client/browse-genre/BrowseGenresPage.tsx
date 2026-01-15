/**
 * @file BrowseGenresPage.tsx
 * @description
 * Page for browsing all available movie genres.
 * Fetches genres from the API and renders them as
 * clickable cards.
 */

import useFetchGenres from "@/pages/genres/hooks/fetch-data/useFetchGenres.ts";
import {GenreArraySchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import GenreImageListCard from "@/pages/genres/components/client/browse-genre/GenreImageListCard.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/**
 * Renders the genre browsing page.
 *
 * Responsibilities:
 * - Fetches all genres (without population or virtuals)
 * - Validates the response using {@link GenreArraySchema}
 * - Displays genres in a responsive grid of cards
 */
const BrowseGenresPage = () => {
    const query = useFetchGenres({
        config: {populate: false, virtuals: false},
    });

    return (
        <ValidatedDataLoader query={query} schema={GenreArraySchema}>
            {(genres: Genre[]) => (
                <PageFlexWrapper>
                    <header>
                        <HeaderTitle>Genres</HeaderTitle>
                        <HeaderDescription>Browse</HeaderDescription>
                    </header>

                    <div className="grid grid-cols-2 gap-4">
                        {genres.map((genre) => (
                            <GenreImageListCard
                                key={genre._id}
                                genre={genre}
                            />
                        ))}
                    </div>
                </PageFlexWrapper>
            )}
        </ValidatedDataLoader>
    );
};

export default BrowseGenresPage;
