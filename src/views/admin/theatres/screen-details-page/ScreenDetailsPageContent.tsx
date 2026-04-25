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
import ScreenDetailsViewSeatsTab
    from "@/views/admin/theatres/screen-details-page/screen-details-tabs/ScreenDetailsViewSeatsTab.tsx";
import SeatFormContextProvider
    from "@/domains/seats/context/form/SeatFormContextProvider.tsx";
import {TheatreDetails} from "@/domains/theatres/schema/model/theatre/Theatre.types.ts";
import {SeatDetailsArray} from "@/domains/seats/schema/seat/SeatRelated.types.ts";
import ScreenDetailsCreateSeatTab
    from "@/views/admin/theatres/screen-details-page/screen-details-tabs/ScreenDetailsCreateSeatTab.tsx";
import ScreenDetailsShowingsTab
    from "@/views/admin/theatres/screen-details-page/screen-details-tabs/ScreenDetailsShowingsTab.tsx";
import useScreenDetailsPageValues
    from "@/domains/theatre-screens/hooks/page/screen-details/useScreenDetailsPageValues.ts";
import {ScreenDetailsActiveTab}
    from "@/domains/theatre-screens/schema/params/ScreenDetailsActiveTabEnumSchema.ts";
import {TheatreScreenDetails} from "@/domains/theatre-screens/schema/model";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {TheatreScreenDetailsPageScreenActions} from "@/views/admin/theatres/screen-details-page/screenActions.tsx";

/**
 * Props for {@link ScreenDetailsPageContent}.
 */
type ContentProps = {
    theatre: TheatreDetails;
    screen: TheatreScreenDetails;
    seats: SeatDetailsArray;
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
const ScreenDetailsPageContent = (
    {theatre, screen, seats}: ContentProps
) => {
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
                    setActiveTab(v as ScreenDetailsActiveTab)
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
                    <ScreenDetailsViewSeatsTab seats={seats}/>
                </SeatDetailsPanelContextProvider>

                <SeatFormContextProvider presetValues={presetValues} disableFields={disableFields}>
                    <ScreenDetailsCreateSeatTab/>
                </SeatFormContextProvider>

                <ScreenDetailsShowingsTab screenID={screenID}/>
            </Tabs>

            <TheatreScreenDetailsPageScreenActions
                theatre={theatre}
                screen={screen}
                className="hidden"
            />
        </PageFlexWrapper>
    );
};

export default ScreenDetailsPageContent;
