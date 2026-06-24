/**
 * @fileoverview Main content component for the Theatre Details administrative page.
 */

import {ReactElement} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {useSetAdminPageTitle} from "@/common/_feat/handle-pages";

import {TheatreDetailsViewData} from "@/domains/theatres/_feat";
import {TheatreDetailsCard} from "@/views/admin/theatres/_comp";
import {
    TheatreDetailsPageScreenSection,
    TheatreDetailsPageShowingSection
} from "@/views/admin/theatres/_pages/theatre-details-page/sections";
import {
    TheatreDetailsHeader,
    TheatreDetailsPageActions
} from "@/views/admin/theatres/_pages/theatre-details-page/elements";

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

    useSetAdminPageTitle({presetTitle: `Theatre | ${theatreName}`})

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