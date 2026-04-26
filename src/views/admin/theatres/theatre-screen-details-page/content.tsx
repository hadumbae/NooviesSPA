/**
 * @fileoverview Layout component for rendering the structural sections of the Theatre Screen details page.
 */

import {TheatreScreenDetailsHeader}
    from "@/views/admin/theatres/theatre-screen-details-page/header.tsx";
import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/schema/model";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {
    TheatreScreenDetailsPageScreenActions
} from "@/views/admin/theatres/theatre-screen-details-page/screenActions.tsx";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";
import {ReactElement} from "react";
import {TheatreScreenDetailsPageTabs} from "@/views/admin/theatres/theatre-screen-details-page/tabs.tsx";


import {TheatreDetails} from "@/domains/theatres/schema/theatre/TheatreDetailsSchema.ts";

/** Props for the TheatreScreenDetailsPageContent component. */
type ContentProps = {
    theatre: TheatreDetails;
    screen: TheatreScreenWithVirtuals;
    seats: Seat[];
};

/**
 * Renders the breadcrumbs, header, and tabbed interface for the screen details view.
 */
export function TheatreScreenDetailsPageContent(
    {theatre, screen, seats}: ContentProps
): ReactElement {
    const {_id: screenID, name: screenName} = screen;
    const {_id: theatreID, name: theatreName, slug: theatreSlug,} = theatre;

    return (
        <PageFlexWrapper>
            <TheatreScreenDetailsHeader
                theatreSlug={theatreSlug}
                theatreName={theatreName}
                screenName={screenName}
            />

            <TheatreScreenDetailsPageTabs
                theatreID={theatreID}
                screenID={screenID}
                seats={seats}
            />

            <TheatreScreenDetailsPageScreenActions
                theatre={theatre}
                screen={screen}
                className="hidden"
            />
        </PageFlexWrapper>
    );
}