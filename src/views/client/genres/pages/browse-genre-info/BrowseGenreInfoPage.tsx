/**
 * @file Client-facing page for displaying detailed information about a specific genre.
 * @filename BrowseGenreInfoPage.tsx
 */

import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchGenreBySlug from "@/domains/genres/fetch/useFetchGenreBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import BrowseGenreInfoPageContent from "@/views/client/genres/pages/browse-genre-info/BrowseGenreInfoPageContent.tsx";
import {Genre, GenreSchema} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Orchestrates the fetching and validation of a single genre's data based on URL parameters.
 */
const BrowseGenreInfoPage = () => {
    /** Extracts and validates the genre slug from the current route. */
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/genres",
        errorMessage: "Genre Not Found.",
    }) ?? {};

    /** Displays a generic page-level skeleton/loader while the slug is being resolved. */
    if (!slug) {
        return <PageLoader/>;
    }

    /** Prepares the query for the specific genre requested. */
    const query = useFetchGenreBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={GenreSchema}>
            {(genre: Genre) => <BrowseGenreInfoPageContent genre={genre}/>}
        </ValidatedDataLoader>
    );
};

export default BrowseGenreInfoPage;