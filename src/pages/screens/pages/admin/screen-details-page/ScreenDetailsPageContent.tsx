/**
 * @file ScreenDetailsPageContent
 * @description
 * Main content component for the **Screen Details Page**.
 *
 * This page displays:
 * - Screen and theatre metadata (breadcrumbs + headers)
 * - A tabbed interface for:
 *   - Viewing existing seats
 *   - Creating seats
 *   - Viewing upcoming showings
 *
 * The component also wires together several context providers:
 *
 * - `SeatDetailsPanelContextProvider` — enables seat selection and the details side-panel
 * - `SeatFormContextProvider` — provides form state for seat creation
 *
 * Routing state is synchronized with URL search params via
 * `useTheatreScreenSearchParams`, keeping the active tab reflected in the URL.
 */

import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import TheatreScreenDetailsBreadcrumbs
    from "@/pages/screens/components/theatre-screen/admin/breadcrumbs/TheatreScreenDetailsBreadcrumbs.tsx";
import TheatreScreenDetailsHeader
    from "@/pages/screens/components/theatre-screen/admin/headers/TheatreScreenDetailsHeader.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import SeatDetailsPanelContextProvider
    from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContextProvider.tsx";
import ScreenDetailsViewSeatsTab
    from "@/pages/screens/pages/admin/screen-details-page/screen-details-tabs/ScreenDetailsViewSeatsTab.tsx";
import SeatFormContextProvider from "@/pages/seats/context/form/SeatFormContextProvider.tsx";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {SeatDetailsArray} from "@/pages/seats/schema/seat/SeatRelated.types.ts";
import useTheatreScreenSearchParams
    from "@/pages/screens/hooks/screens-by-theatres/params/useTheatreScreenSearchParams.ts";
import ScreenDetailsCreateSeatTab
    from "@/pages/screens/pages/admin/screen-details-page/screen-details-tabs/ScreenDetailsCreateSeatTab.tsx";
import {SeatForm} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";
import ScreenSubmitFormPanel from "@/pages/screens/components/submit-form/panel/ScreenSubmitFormPanel.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {ScreenDetailsUIContext} from "@/pages/screens/contexts/screen-details/ScreenDetailsUIContext.ts";
import ScreenDeleteWarningDialog from "@/pages/screens/components/dialog/ScreenDeleteWarningDialog.tsx";

type ContentProps = {
    /** The parent theatre that owns this screen. */
    theatre: TheatreDetails;

    /** The specific screen being viewed. */
    screen: ScreenDetails;

    /** All seat details associated with this screen. */
    seats: SeatDetailsArray;
};

/**
 * Renders the full **Screen Details** page, including all tabs,
 * headers, search-param state management, and context boundaries.
 *
 * Tabs included:
 *
 * - **view-seats** — shows a visual layout of seats and enables seat selection
 * - **create-seats** — provides tools for adding seats to the screen
 * - **showings** — (placeholder) lists upcoming showings for this screen
 *
 * URL search params are integrated through
 * {@link useTheatreScreenSearchParams}, ensuring the active tab is
 * reflected in the browser's query string.
 *
 * @param {ContentProps} props - Theatre, screen, and seat data for this page.
 *
 * @example
 * ```tsx
 * <ScreenDetailsPageContent
 *   theatre={theatre}
 *   screen={screen}
 *   seats={seatDetails}
 * />
 * ```
 */
const ScreenDetailsPageContent = (props: ContentProps) => {
    // --- Props ---
    const {theatre, screen, seats} = props;

    // --- Search Params ---
    const {searchParams, setActiveTab} = useTheatreScreenSearchParams({activeTab: "seats"});
    const {activeTab, showingPage, showingsPerPage} = searchParams;

    // --- Form Options ---
    const presetValues: Partial<SeatForm> = {screen: screen._id, theatre: theatre._id};
    const disableFields: (keyof SeatFormValues)[] = ["theatre", "screen"];

    // --- Access Context ---
    const {
        isEditing,
        setIsEditing,
        showDeleteWarning,
        setShowDeleteWarning,
    } = useRequiredContext({context: ScreenDetailsUIContext});

    // --- Render ---
    return (
        <PageFlexWrapper>

            {/* Header */}

            <section className="space-y-1">
                <SectionHeader srOnly={true}>Seat Details : Header</SectionHeader>

                <TheatreScreenDetailsBreadcrumbs
                    theatreID={theatre._id}
                    theatreName={theatre.name}
                    screenName={screen.name}
                />

                <TheatreScreenDetailsHeader
                    theatreName={theatre.name}
                    screenName={screen.name}
                />
            </section>

            {/* Tabs */}

            <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v)}>
                <div className="flex justify-center">
                    <TabsList>
                        <TabsTrigger value="view-seats">Seats</TabsTrigger>
                        <TabsTrigger value="create-seats">Create Seats</TabsTrigger>
                        <TabsTrigger value="showings">Showings</TabsTrigger>
                    </TabsList>
                </div>

                {/* Seats Tab */}
                <SeatDetailsPanelContextProvider>
                    <ScreenDetailsViewSeatsTab
                        seats={seats}
                    />
                </SeatDetailsPanelContextProvider>

                {/* Create Seats Tab */}
                <SeatFormContextProvider presetValues={presetValues} disableFields={disableFields}>
                    <ScreenDetailsCreateSeatTab/>
                </SeatFormContextProvider>

                {/* Showings Tab */}
                <TabsContent value="showings">
                    <p>Showings</p>
                    <p>Page : {showingPage}</p>
                    <p>Per Page : {showingsPerPage}</p>
                </TabsContent>
            </Tabs>

            {/*Hidden Sections*/}

            <section>
                <SectionHeader srOnly={true}>Edit Screen Form</SectionHeader>
                <ScreenSubmitFormPanel
                    presetOpen={isEditing}
                    setPresetOpen={setIsEditing}
                />
            </section>

            <section>
                <SectionHeader srOnly={true}>Delete Screen Dialog</SectionHeader>
                <ScreenDeleteWarningDialog
                    screenID={screen._id}
                    presetOpen={showDeleteWarning}
                    setPresetOpen={setShowDeleteWarning}
                />
            </section>
        </PageFlexWrapper>
    );
};

export default ScreenDetailsPageContent;
