/**
 * @file MovieDetailsPageCreditTab.tsx
 *
 * @summary
 * Credits tab for the movie details page.
 *
 * @description
 * Responsible for fetching, validating, and rendering a summarized
 * cast overview for a specific movie inside a tab panel.
 *
 * Data flow:
 * - Fetches CAST credits for the movie via {@link useFetchMovieCredits}
 * - Applies query boundaries for loading and error handling
 * - Validates the response against {@link MovieCreditDetailsArraySchema}
 * - Renders {@link MovieDetailsCreditOverview} on success
 *
 * This component is intentionally thin and declarative, delegating:
 * - Data fetching → hooks
 * - State handling → query boundaries
 * - Presentation → child components
 */

import {useFetchMovieCredits} from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import MovieDetailsCreditOverview from "@/pages/movies/components/details/MovieDetailsCreditOverview.tsx";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MovieCreditDetailsArraySchema} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.schema.ts";
import {MovieCreditDetailsArray} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.types.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/**
 * Props for {@link MovieDetailsPageCreditTab}.
 */
type TabProps = {
    /**
     * Unique identifier (slug) of the movie whose credits are displayed.
     */
    slug: ObjectId;
};

/**
 * Movie credits tab content.
 *
 * @remarks
 * - Fetches only CAST credits
 * - Sorts results by billing order (ascending)
 * - Limits results for overview display
 * - Populates referenced documents and virtual fields
 *
 * @param props - Component props
 * @returns Rendered tab panel containing the cast overview
 */
const MovieDetailsPageCreditTab = ({slug}: TabProps) => {
    const query = useFetchMovieCredits({
        queries: {movieSlug: slug, department: "CAST", sortByBillingOrder: "asc"},
        config: {populate: true, virtuals: true, limit: 6},
    });

    return (
        <ValidatedDataLoader query={query} schema={MovieCreditDetailsArraySchema}>
            {(credits: MovieCreditDetailsArray) => (
                <TabsContent value="credits">
                    <MovieDetailsCreditOverview
                        slug={slug}
                        credits={credits}
                    />
                </TabsContent>
            )}
        </ValidatedDataLoader>
    );
};

export default MovieDetailsPageCreditTab;
