/**
 * @file ScreenDetailsPageContent.tsx
 *
 * Main content component for the **Screen Details** admin page.
 *
 * Responsibilities:
 * - Renders screen + theatre headers and breadcrumbs
 * - Manages tab navigation via URL search params
 * - Wires seat, form, and screen UI contexts
 * - Hosts edit and delete screen affordances
 */

import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import TheatreScreenDetailsBreadcrumbs
    from "@/pages/screens/components/theatre-screen/admin/breadcrumbs/TheatreScreenDetailsBreadcrumbs.tsx";
import TheatreScreenDetailsHeader
    from "@/pages/screens/components/theatre-screen/admin/headers/TheatreScreenDetailsHeader.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import SeatDetailsPanelContextProvider
    from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContextProvider.tsx";
import ScreenDetailsViewSeatsTab
    from "@/pages/screens/pages/admin/screen-details-page/screen-details-tabs/ScreenDetailsViewSeatsTab.tsx";
import SeatFormContextProvider
    from "@/pages/seats/context/form/SeatFormContextProvider.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {SeatDetailsArray} from "@/pages/seats/schema/seat/SeatRelated.types.ts";
import ScreenDetailsCreateSeatTab
    from "@/pages/screens/pages/admin/screen-details-page/screen-details-tabs/ScreenDetailsCreateSeatTab.tsx";
import ScreenSubmitFormPanel
    from "@/pages/screens/components/submit-form/panel/ScreenSubmitFormPanel.tsx";
import ScreenDeleteWarningDialog
    from "@/pages/screens/components/dialog/ScreenDeleteWarningDialog.tsx";
import ScreenDetailsShowingsTab
    from "@/pages/screens/pages/admin/screen-details-page/screen-details-tabs/ScreenDetailsShowingsTab.tsx";
import useScreenDetailsPageValues
    from "@/pages/screens/hooks/page/screen-details/useScreenDetailsPageValues.ts";
import {ScreenDetailsActiveTab}
    from "@/pages/screens/schema/params/ScreenDetailsActiveTabEnumSchema.ts";
import useNavigateToTheatre
    from "@/pages/theatres/hooks/navigate/navigate-to-theatre/useNavigateToTheatre.ts";

/**
 * Props required to render the Screen Details page.
 */
type ContentProps = {
    /** Parent theatre owning the screen */
    theatre: TheatreDetails;

    /** Screen currently being viewed */
    screen: ScreenDetails;

    /** Seat details for the screen */
    seats: SeatDetailsArray;
};

/**
 * Screen Details page content.
 *
 * Tabs:
 * - **Seats** — seat layout and selection
 * - **Create Seats** — seat creation tools
 * - **Showings** — upcoming showings for the screen
 *
 * Active tab state is synchronized with URL search params
 * via {@link useScreenDetailsPageValues}.
 *
 * @param theatre - Theatre details
 * @param screen - Screen details
 * @param seats - Associated seat data
 */
const ScreenDetailsPageContent = ({theatre, screen, seats}: ContentProps) => {
    const {_id: screenID, name: screenName} = screen;
    const {_id: theatreID, name: theatreName, slug: theatreSlug} = theatre;

    const {
        presetValues,
        disableFields,
        context: {isEditing, setIsEditing, showDeleteWarning, setShowDeleteWarning},
        tabConfig: {activeTab, setActiveTab},
    } = useScreenDetailsPageValues({theatreID, screenID});

    const navigateToTheatre = useNavigateToTheatre({
        slug: theatreSlug,
        source: TheatreScreenDetailsHeader.name,
        message: "Navigate to index after deleting screen.",
    });

    return (
        <PageFlexWrapper>

            {/* Header */}

            <section className="space-y-1">
                <SectionHeader srOnly>Screen Details Header</SectionHeader>

                <TheatreScreenDetailsBreadcrumbs
                    theatreID={theatreID}
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
                onValueChange={(v) => setActiveTab(v as ScreenDetailsActiveTab)}
            >
                <div className="flex justify-center">
                    <TabsList>
                        <TabsTrigger value="view-seats">Seats</TabsTrigger>
                        <TabsTrigger value="create-seats">Create Seats</TabsTrigger>
                        <TabsTrigger value="showings">Showings</TabsTrigger>
                    </TabsList>
                </div>

                <SeatDetailsPanelContextProvider>
                    <ScreenDetailsViewSeatsTab seats={seats}/>
                </SeatDetailsPanelContextProvider>

                <SeatFormContextProvider
                    presetValues={presetValues}
                    disableFields={disableFields}
                >
                    <ScreenDetailsCreateSeatTab/>
                </SeatFormContextProvider>

                <ScreenDetailsShowingsTab screenID={screenID}/>
            </Tabs>

            {/* Edit Screen */}

            <section>
                <SectionHeader srOnly>Edit Screen</SectionHeader>
                <ScreenSubmitFormPanel
                    presetOpen={isEditing}
                    setPresetOpen={setIsEditing}
                />
            </section>

            {/* Delete Screen */}

            <section>
                <SectionHeader srOnly>Delete Screen</SectionHeader>
                <ScreenDeleteWarningDialog
                    screenID={screenID}
                    presetOpen={showDeleteWarning}
                    setPresetOpen={setShowDeleteWarning}
                    onDeleteSuccess={navigateToTheatre}
                />
            </section>
        </PageFlexWrapper>
    );
};

export default ScreenDetailsPageContent;
