/**
 * @fileoverview Defines the Credits tab for the Movie Details page.
 * Fetches and validates a prioritized list of cast members to provide
 * a high-level overview of the movie's production credits.
 */

import {useFetchMovieCredits} from "@/domains/moviecredit/_feat/crud/useFetchMovieCredits.ts";
import MovieDetailsCreditOverview from "@/domains/movies/components/details/MovieDetailsCreditOverview.tsx";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {
    MovieCreditDetailsArray,
    MovieCreditDetailsArraySchema
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsArraySchema.ts";

type TabProps = {
    slug: ObjectId;
};

/**
 * Renders the top-billed cast members within a tabbed panel.
 */
export function MovieDetailsPageCreditTab({slug}: TabProps) {
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
}