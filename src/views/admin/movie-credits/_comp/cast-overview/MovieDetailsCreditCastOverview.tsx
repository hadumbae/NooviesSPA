/**
 * @fileoverview Compact, card-based overview of a movie's cast credits.
 */

import {ReactElement} from 'react';
import {ObjectId} from "@/common/_schemas";
import {MovieCreditDetails} from "@/domains/movie-credits/_schemas/model/MovieCreditDetailsSchema.ts";
import {EmptyArrayContainer} from "@/common/components/text/EmptyArrayContainer.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {
    MovieCreditCastOverviewCard
} from "@/views/admin/movie-credits/_comp/cast-overview/MovieCreditCastOverviewCard.tsx";

/** Props for the MovieDetailsCreditOverview component. */
export type OverviewProps = {
    slug: ObjectId;
    credits: (Extract<MovieCreditDetails, { department: "CAST" }>)[];
};

/** Displays a summarised grid of cast member cards with navigation to full credit lists. */
export function MovieDetailsCreditCastOverview(
    {credits}: OverviewProps
): ReactElement {
    if (credits.length === 0) {
        return (
            <EmptyArrayContainer
                text="There Are No Credits"
                className="h-40 border rounded-xl"
            />
        );
    }

    return (
        <div className="space-y-4">
            <SROnly text="Movie Cast Overview List"/>

            <div className="grid grid-cols-2 gap-2">
                {credits.map((credit) => (
                    <MovieCreditCastOverviewCard
                        credit={credit}
                        key={credit._id}
                    />
                ))}
            </div>
        </div>
    );
}