/** @fileoverview Tab content for displaying a preview of movie cast credits. */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    MovieCreditDetailsArray,
    MovieCreditDetailsArraySchema
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsArraySchema.ts";
import {useFetchMovieCredits} from "@/domains/moviecredit/_feat/crud-hooks";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {MovieCreditDetails} from "@/domains/moviecredit/schemas";
import {ReactElement} from "react";
import {MovieDetailsCreditCastOverview} from "@/views/admin/movie-credits/_comp/cast-overview";

/** Cast-specific movie credit details filtered by department. */
type CastCredits = (Extract<MovieCreditDetails, { department: "CAST" }>)[];

/** Props for the MovieDetailsPageCastCreditTab component. */
type TabProps = {
    slug: ObjectId;
};

/** Renders the top-billed cast members within a tabbed panel using validated query data. */
export function MovieDetailsPageCastCreditTab({slug}: TabProps): ReactElement {
    const query = useFetchMovieCredits({
        schema: MovieCreditDetailsArraySchema,
        queries: {movieSlug: slug, department: "CAST", sortByBillingOrder: 1},
        config: {populate: true, virtuals: true, limit: 6},
    });

    return (
        <QueryDataLoader query={query}>
            {(credits: MovieCreditDetailsArray) => (
                <TabsContent value="credits">
                    <MovieDetailsCreditCastOverview
                        slug={slug}
                        credits={credits as CastCredits}
                    />
                </TabsContent>
            )}
        </QueryDataLoader>
    );
}