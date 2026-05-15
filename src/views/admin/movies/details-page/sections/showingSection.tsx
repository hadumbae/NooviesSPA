/**
 * @fileoverview Showings tab content for the Movie Details page.
 */

import {ReactElement} from "react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PageSectionHeaderLink} from "@/views/common/_comp/page";
import useFetchShowings from "@/domains/showings/hooks/queries/useFetchShowings.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ShowingSummaryCard} from "@/domains/showings/components/admin/card/showing-summary-card/ShowingSummaryCard.tsx";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/** Props for the MovieDetailsPageShowingSection component. */
type TabProps = {
    _id: ObjectId;
};

/**
 * Displays a list of screenings for a specific movie with a link to full management.
 */
export function MovieDetailsPageShowingSection(
    {_id}: TabProps
): ReactElement {
    const query = useFetchShowings({
        queries: {movie: _id, sortByStartTime: 1},
        config: {virtuals: true, populate: true, limit: 10},
    });

    return (
        <div className="space-y-4">
            <PageSectionHeaderLink
                to={`/admin/showings?movie=${_id}`}
                text="Showings"
            />

            <ValidatedDataLoader query={query} schema={generateArraySchema(ShowingDetailsSchema)}>
                {(showings: ShowingDetails[]) => {
                    if (showings.length === 0) {
                        return (
                            <EmptyArrayContainer
                                className="h-28 border rounded-xl"
                                text="There Are No Showings"
                            />
                        );
                    }

                    return (
                        <div className={cn("grid grid-cols-1 gap-2")}>
                            {showings.map((showing) => (
                                <ShowingSummaryCard key={showing._id} showing={showing}/>
                            ))}
                        </div>
                    );
                }}
            </ValidatedDataLoader>
        </div>
    );
}