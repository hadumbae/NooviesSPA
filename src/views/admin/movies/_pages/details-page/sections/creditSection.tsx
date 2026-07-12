/**
 * @fileoverview Section component for displaying a preview of movie cast credits.
 */


import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReactElement} from "react";
import {PageSectionHeaderLink} from "@/views/common/_comp/page";
import {useFetchMovieCredits} from "@/domains/movie-credits/_feat/crud-hooks";
import {
    MovieCreditDetails, MovieCreditDetailsSchema,
} from "@/domains/movie-credits/_schemas";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import {MovieDetailsCreditCastOverview} from "@/views/admin/movie-credits/_comp/cast-overview";
import {SlugString} from "@/common/_schemas/strings/SlugString.ts";
import {generateArraySchema} from "@/common/_feat/validation-builders";

/** Cast-specific movie credit details filtered by department. */
type CastCredits = (Extract<MovieCreditDetails, { department: "CAST" }>)[];

/** Props for the MovieDetailsPageCreditSection component. */
type TabProps = {
    _id: ObjectId;
    slug: SlugString;
};

/** Renders the top-billed cast members within a section using validated query data. */
export function MovieDetailsPageCreditSection({_id, slug}: TabProps): ReactElement {
    const query = useFetchMovieCredits({
        schema: generateArraySchema(MovieCreditDetailsSchema),
        queries: {movie: _id, department: "CAST", sortByBillingOrder: 1},
        config: {populate: true, virtuals: true, limit: 6},
    });

    return (
        <section className="space-y-4">
            <PageSectionHeaderLink
                to={`/admin/movies/get/${slug}/people/cast`}
                text="Cast Overview"
            />

            <QueryDataLoader query={query}>
                {(credits: MovieCreditDetails[]) => (
                    <MovieDetailsCreditCastOverview
                        slug={slug}
                        credits={credits as CastCredits}
                    />
                )}
            </QueryDataLoader>
        </section>
    );
}