/**
 * @fileoverview Main content component for the Theatre Details administrative page.
 */

import {ReactElement} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {TheatreDetailsHeader} from "@/views/admin/theatres/theatre-details-page/header.tsx";
import {TheatreDetailsCard} from "@/views/admin/theatres/_comp/display-cards/TheatreDetailsCard.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {TheatreDetailsPageActions} from "./actions.tsx";
import {
    TheatreDetailsPageScreenSection
} from "@/views/admin/theatres/theatre-details-page/sections/TheatreDetailsPageScreenSection.tsx";
import {
    TheatreDetailsPageShowingSection
} from "@/views/admin/theatres/theatre-details-page/sections/TheatreDetailsPageShowingSection.tsx";
import {TheatreDetailsViewData} from "@/domains/theatres/_feat/admin-view-data";

/** Props for the TheatreDetailsPageContent component. */
type TheatreDetailsPageContentProps = {
    pageData: TheatreDetailsViewData
    screenPage: number;
    screenPerPage: number;
    setScreenPage: (page: number) => void;
};

/**
 * Renders the layout for theatre management, including details cards and related data tabs.
 */
export function TheatreDetailsPageContent(
    {pageData, screenPage, screenPerPage, setScreenPage}: TheatreDetailsPageContentProps
): ReactElement {
    const {theatre, screens, showings} = pageData;
    const {_id: theatreID, slug: theatreSlug, name: theatreName} = theatre;

    return (
        <PageFlexWrapper>
            <TheatreDetailsHeader theatreName={theatreName}/>

            <section>
                <SROnly text="Theatre Details Card"/>
                <TheatreDetailsCard theatre={theatre}/>
            </section>

            <TheatreDetailsPageScreenSection
                theatreID={theatreID}
                theatreSlug={theatreSlug}
                screens={screens.items}
                totalScreens={screens.totalItems}
                page={screenPage}
                perPage={screenPerPage}
                setPage={setScreenPage}
            />

            <TheatreDetailsPageShowingSection
                theatreSlug={theatreSlug}
                showings={showings}
            />

            <TheatreDetailsPageActions
                theatre={theatre}
            />
        </PageFlexWrapper>
    );
}