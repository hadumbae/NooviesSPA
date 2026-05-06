/**
 * @fileoverview Renders the showings section on the Theatre Details page.
 */

import {ReactElement} from "react";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {ShowingDetails} from "@/domains/showings/schema/showing";
import {TheatreDetailsPageShowingsSectionHeader} from "@/views/admin/theatres/theatre-details-page";
import {cn} from "@/common/lib/utils.ts";
import {ShowingSummaryCard} from "@/domains/showings/components/admin/card/showing-summary-card/ShowingSummaryCard.tsx";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";

/** Props for the TheatreDetailsPageShowingSection component. */
type SectionProps = {
    theatreSlug: SlugString;
    showings: ShowingDetails[];
    className?: string;
};

/** Renders the showings section containing a list of summary cards or an empty state indicator. */
export function TheatreDetailsPageShowingSection(
    {theatreSlug, showings, className}: SectionProps
): ReactElement {
    return (
        <section className='space-y-4'>
            <TheatreDetailsPageShowingsSectionHeader theatreSlug={theatreSlug}/>

            {
                showings.length > 0 ? (
                    <div className={cn("grid grid-cols-1 xl:grid-cols-2 gap-2", className)}>
                        {showings.map((showing) => <ShowingSummaryCard key={showing._id} showing={showing}/>)}
                    </div>
                ) : (
                    <EmptyArrayContainer
                        text="There Are No Showings."
                        className="border rounded-xl h-32"
                    />
                )
            }
        </section>
    );
}