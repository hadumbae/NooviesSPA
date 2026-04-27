/** @fileoverview Compact, card-based overview of a movie's cast credits. */

import {ReactElement} from 'react';
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsSchema.ts";
import {PageSectionHeaderLink} from "@/views/common/_comp/page";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {MovieCreditCastOverviewCard} from "@/domains/movies/components/details/MovieCreditCastOverviewCard.tsx";

/** Props for the MovieDetailsCreditOverview component. */
export type OverviewProps = {
    slug: ObjectId;
    credits: (Extract<MovieCreditDetails, { department: "CAST" }>)[];
};

/** Displays a summarized grid of cast member cards with navigation to full credit lists. */
export function MovieDetailsCreditCastOverview(
    {slug, credits}: OverviewProps
): ReactElement {
    return (
        <section className="space-y-4">
            <PageSectionHeaderLink to={`/admin/movies/get/${slug}/people/cast`}>
                Cast Overview
            </PageSectionHeaderLink>

            {
                credits.length > 0 ? (
                    <section className="space-y-4">
                        <SROnly text="Movie Cast Overview List"/>

                        <div className="grid grid-cols-2 gap-2">
                            {credits.map((credit) => <MovieCreditCastOverviewCard key={credit._id} credit={credit}/>)}
                        </div>
                    </section>
                ) : (
                    <EmptyArrayContainer text="There Are No Credits" className="h-40"/>
                )
            }
        </section>
    );
}