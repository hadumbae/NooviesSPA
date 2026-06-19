/**
 * @fileoverview Entry point for the public-facing Genres browsing page.
 *
 */

import {ReactElement} from "react";
import {useFetchGenres} from "@/domains/genres/_feat/crud-hooks/fetch/useFetchGenres.ts";
import {GenreSchema} from "@/domains/genres";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {Genre} from "@/domains/genres/schema";
import {BrowseGenresPageContent} from "@/views/client/genres/browse-genres-page/content.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
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