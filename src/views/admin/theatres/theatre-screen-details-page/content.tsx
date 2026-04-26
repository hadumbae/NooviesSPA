/**
 * @file ScreenDetailsPageContent.tsx
 *
 * Content renderer for the Screen Details admin page.
 *
 * Coordinates:
 * - Screen and theatre headers
 * - Tabbed screen views
 * - Seat, form, and delete contexts
 */


import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import TheatreScreenDetailsBreadcrumbs
    from "@/views/admin/theatre-screens/components/theatre-screen/admin/breadcrumbs/TheatreScreenDetailsBreadcrumbs.tsx";
import TheatreScreenDetailsHeader
    from "@/views/admin/theatre-screens/components/theatre-screen/admin/headers/TheatreScreenDetailsHeader.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import SeatDetailsPanelContextProvider
    from "@/domains/seats/context/seat-details-context/SeatDetailsPanelContextProvider.tsx";
import {TheatreScreenDetailsViewSeatsTab}
    from "@/views/admin/theatres/theatre-screen-details-page/screen-details-tabs/TheatreScreenDetailsViewSeatsTab.tsx";
import SeatFormContextProvider
    from "@/domains/seats/context/form/SeatFormContextProvider.tsx";
import {TheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import TheatreScreenDetailsCreateSeatTab
    from "@/views/admin/theatres/theatre-screen-details-page/screen-details-tabs/TheatreScreenDetailsCreateSeatTab.tsx";
import TheatreScreenDetailsShowingsTab
    from "@/views/admin/theatres/theatre-screen-details-page/screen-details-tabs/TheatreScreenDetailsShowingsTab.tsx";
import useScreenDetailsPageValues
    from "@/domains/theatre-screens/hooks/page/screen-details/useScreenDetailsPageValues.ts";
import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/schema/model";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {
    TheatreScreenDetailsPageScreenActions
} from "@/views/admin/theatres/theatre-screen-details-page/screenActions.tsx";
import {
    TheatreScreenDetailsActiveTab
} from "@/domains/theatre-screens/schema/search-params/TheatreScreenDetailsActiveTabEnumSchema.ts";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";
import {ReactElement} from "react";

/**
 * Props for {@link TheatreScreenDetailsPageContent}.
 */
type ContentProps = {
    theatre: TheatreDetails;
    screen: TheatreScreenWithVirtuals;
    seats: Seat[];
};

/**
 * Screen Details page content.
 *
 * Tabs:
 * - Seats
 * - Create Seats
 * - Showings
 *
 * Active tab and edit state are synchronized with
 * URL search params via {@link useScreenDetailsPageValues}.
 *
 * @component
 */
export function TheatreScreenDetailsPageContent(
    {theatre, screen, seats}: ContentProps
): ReactElement {
    const {_id: screenID, name: screenName} = screen;
    const {_id: theatreID, name: theatreName, slug: theatreSlug,} = theatre;

    const {presetValues, disableFields, tabConfig: {activeTab, setActiveTab}} = useScreenDetailsPageValues({
        theatreID,
        screenID
    });

    return (
        <PageFlexWrapper>

            {/* Header */}

            <section className="space-y-1">
                <SectionHeader srOnly>
                    Screen Details Header
                </SectionHeader>

                <TheatreScreenDetailsBreadcrumbs
                    theatreSlug={theatreSlug}
                    theatreName={theatreName}
                    screenName={screenName}
                />

                <TheatreScreenDetailsHeader
                    theatreName={theatreName}
                    screenName={screenName}
                />
            </section>

            {/* Tabs */}

            <Tabs
                defaultValue={activeTab}
                onValueChange={(v) =>
                    setActiveTab(v as TheatreScreenDetailsActiveTab)
                }
            >
                <div className="flex justify-center">
                    <TabsList>
                        <TabsTrigger value="view-seats">
                            Seats
                        </TabsTrigger>
                        <TabsTrigger value="create-seats">
                            Create Seats
                        </TabsTrigger>
                        <TabsTrigger value="showings">
                            Showings
                        </TabsTrigger>
                    </TabsList>
                </div>

                <SeatDetailsPanelContextProvider>
                    <TheatreScreenDetailsViewSeatsTab seats={seats}/>
                </SeatDetailsPanelContextProvider>

                <SeatFormContextProvider presetValues={presetValues} disableFields={disableFields}>
                    <TheatreScreenDetailsCreateSeatTab/>
                </SeatFormContextProvider>

                <TheatreScreenDetailsShowingsTab screenID={screenID}/>
            </Tabs>

            <TheatreScreenDetailsPageScreenActions
                theatre={theatre}
                screen={screen}
                className="hidden"
            />
        </PageFlexWrapper>
    );
}