/**
 * @fileoverview Client-facing page for displaying detailed genre information.
 * Orchestrates URL parameter extraction and genre data retrieval.
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {PageLoader} from "@/views/common/_comp/page";
import BrowseGenreInfoPageContent from "@/views/client/genres/browse-genre-info/content.tsx";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchGenreBySlug} from "@/domains/genres/_feat/crud-hooks";
import {Genre, GenreSchema} from "@/domains/genres/schema";
import {ReactElement} from "react";

/**
 * Orchestrates the fetching and validation of genre data based on URL slug.
 */
export function BrowseGenreInfoPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/genres",
        errorMessage: "Genre Not Found.",
    }) ?? {};

    const query = useFetchGenreBySlug({
        slug: slug!,
        schema: GenreSchema,
        config: {populate: true, virtuals: true},
        options: {enabled: !!slug}
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {(genre: Genre) => <BrowseGenreInfoPageContent genre={genre}/>}
        </QueryDataLoader>
    );
}