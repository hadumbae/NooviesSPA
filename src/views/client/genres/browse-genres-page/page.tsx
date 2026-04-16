/**
 * @fileoverview Main entry point for the public-facing Genres browsing page.
 * Orchestrates data fetching, document metadata, and state-driven rendering.
 */

import {ReactElement} from "react";
import useFetchGenres from "@/domains/genres/_feat/crud-hooks/useFetchGenres.ts";
import {GenreArraySchema} from "@/domains/genres/schema/genre/GenreArraySchema.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {Genre} from "@/domains/genres/schema";
import {BrowseGenresPageContent} from "@/views/client/genres/browse-genres-page/content.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";

/**
 * Page component that displays a comprehensive list of movie genres.
 */
export function BrowseGenresPage(): ReactElement {
    useTitle("Browse Genres");

    const query = useFetchGenres({
        schema: GenreArraySchema,
        config: {populate: false, virtuals: false},
    });

    return (
        <QueryDataLoader query={query}>
            {(genres: Genre[]) => <BrowseGenresPageContent genres={genres}/>}
        </QueryDataLoader>
    );
}