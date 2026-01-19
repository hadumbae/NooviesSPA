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
    from "@/pages/theatres/hooks/navigation/navigate-to-theatre/useNavigateToTheatre.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {useLocation} from "react-router-dom";

/**
 * Props for {@link ScreenDetailsPageContent}.
 */
type ContentProps = {
    /** Parent theatre */
    theatre: TheatreDetails;

    /** Screen being viewed */
    screen: ScreenDetails;

    /** Seat data for the screen */
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

    const {search} = useLocation();
    const navigate = useLoggedNavigate();
    const navigateToTheatre = useNavigateToTheatre();

    const {
        presetValues,
        disableFields,
        context: {
            isEditing,
            setIsEditing,
            showDeleteWarning,
            setShowDeleteWarning,
        },
        tabConfig: {activeTab, setActiveTab},
    } = useScreenDetailsPageValues({theatreID, screenID});

    const onUpdateSuccess = (screen: ScreenDetails) => {
        const {theatre: {slug: theatreSlug}, slug: screenSlug} = screen;

        navigate({
            to: `/admin/theatres/get/${theatreSlug}/screen/${screenSlug}${search}`,
            message: "Replace URL on screen update.",
            options: {replace: true},
        });
    }

    /**
     * Navigates back to the theatre after successful deletion.
     */
    const onDeleteSuccess = () => {
        navigateToTheatre({
            slug: theatreSlug,
            component: ScreenDetailsPageContent.name,
            message: "Navigate to theatre after deleting screen.",
        });
    };

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

                <SeatFormContextProvider
                    presetValues={presetValues}
                    disableFields={disableFields}
                >
                    <ScreenDetailsCreateSeatTab/>
                </SeatFormContextProvider>

                <ScreenDetailsShowingsTab
                    screenID={screenID}
                />
            </Tabs>

            {/* Edit Screen */}

            <section>
                <SectionHeader srOnly>
                    Edit Screen
                </SectionHeader>

                <ScreenSubmitFormPanel
                    presetOpen={isEditing}
                    setPresetOpen={setIsEditing}
                    onSubmitSuccess={onUpdateSuccess}
                />
            </section>

            {/* Delete Screen */}

            <section>
                <SectionHeader srOnly>
                    Delete Screen
                </SectionHeader>

                <ScreenDeleteWarningDialog
                    screenID={screenID}
                    presetOpen={showDeleteWarning}
                    setPresetOpen={setShowDeleteWarning}
                    onDeleteSuccess={onDeleteSuccess}
                />
            </section>
        </PageFlexWrapper>
    );
};

export default ScreenDetailsPageContent;
