/**
 * @fileoverview Entry point for the public-facing Genres browsing page.
 *
 */

import {ReactElement} from "react";
import {useFetchGenres} from "@/domains/genres/_feat/crud-hooks/fetch/useFetchGenres.ts";
import {GenreSchema} from "@/domains/genres";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {Genre} from "@/domains/genres/_schema";
import {BrowseGenresPageContent} from "@/views/client/genres/browse-genres-page/content.tsx";
import {useTitle} from "@/common/_feat";
import {generateArraySchema} from "@/common/_feat/validation-builders";

/**
 * Page component that fetches and displays a list of movie genres.
 */
export function BrowseGenresPage(): ReactElement {
    useTitle("Browse Genres");

    const query = useFetchGenres({
        schema: generateArraySchema(GenreSchema),
        config: {populate: false, virtuals: false},
    });

    return (
        <QueryDataLoader query={query}>
            {(genres: Genre[]) => <BrowseGenresPageContent genres={genres}/>}
        </QueryDataLoader>
    );
}