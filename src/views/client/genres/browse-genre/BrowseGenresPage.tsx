/**
 * @fileoverview Page for browsing and selecting movie genres.
 */

import useFetchGenres from "@/domains/genres/_feat/crud-hooks/useFetchGenres.ts";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import GenreImageListCard from "@/views/client/genres/_comp/GenreImageListCard.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {GenreArraySchema} from "@/domains/genres/schema/genre/GenreArraySchema.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {Genre} from "@/domains/genres/schema";

/**
 * Renders a responsive grid of genre cards.
 */
const BrowseGenresPage = () => {
    const query = useFetchGenres({
        schema: GenreArraySchema,
        config: {populate: false, virtuals: false},
    });

    return (
        <QueryDataLoader query={query}>
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
        </QueryDataLoader>
    );
};

export default BrowseGenresPage;