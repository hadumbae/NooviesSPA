/**
 * @fileoverview Tab component for the Theatre Details page that lists scheduled movie showings.
 */

import {ReactElement} from "react";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {
    TheatreDetailsShowingsTabHeader
} from "@/views/admin/theatres/theatre-details-page/tabs/TheatreDetailsShowingsTabHeader.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ShowingSummaryCard} from "@/domains/showings/components/admin/card/showing-summary-card/ShowingSummaryCard.tsx";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {TabsContent} from "@/common/components/ui/tabs.tsx";

/** Props for the TheatreDetailsShowingsTab component. */
type ContentProps = {
    theatreSlug: SlugString;
    showings: ShowingDetails[]
    className?: string;
};

/**
 * Renders a list of active scheduled showings for a theatre, accompanied by
 * administrative actions to create or manage the full showings list.
 */
export function TheatreDetailsShowingsTab(
    {theatreSlug, showings, className}: ContentProps
): ReactElement {
    return (
        <TabsContent value="showings" className={cn("space-y-4", className)}>
            <TheatreDetailsShowingsTabHeader theatreSlug={theatreSlug}/>

            {
                showings.length > 0 ? (
                    <div className={cn("grid grid-cols-1 gap-2", className)}>
                        {showings.map((showing) => <ShowingSummaryCard key={showing._id} showing={showing}/>)}
                    </div>
                ) : (
                    <EmptyArrayContainer
                        text="There Are No Showings."
                        className="border rounded-xl h-32"
                    />
                )
            }
        </TabsContent>
    );
}