import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchGenreBySlug from "@/pages/genres/hooks/fetch-data/useFetchGenreBySlug.ts";
import {GenreDetailsSchema} from "@/pages/genres/schema/genre/Genre.schema.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import BrowseGenreInfoPageContent from "@/pages/genres/pages/client/browse-genre-info/BrowseGenreInfoPageContent.tsx";

/**
 * Client-facing page for displaying detailed information about a genre.
 *
 * Responsibilities:
 * - Validates and extracts the `slug` route parameter
 * - Fetches genre data by slug
 * - Guards rendering with schema validation
 *
 * @remarks
 * - Redirects to `/browse/genres` if the slug is invalid or missing
 * - Displays a page loader while route params or data are unresolved
 * - Ensures type-safe rendering via {@link GenreDetailsSchema}
 */
const BrowseGenreInfoPage = () => {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/browse/genres",
        errorMessage: "Genre Not Found.",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const query = useFetchGenreBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={GenreDetailsSchema}>
            {(genre: GenreDetails) => <BrowseGenreInfoPageContent genre={genre}/>}
        </ValidatedDataLoader>
    );
};

export default BrowseGenreInfoPage;
