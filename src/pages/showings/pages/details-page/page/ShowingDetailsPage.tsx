/**
 * @file ShowingDetailsPageContent.tsx
 *
 * @summary
 * Main content layout for the Showing Details admin page.
 *
 * @description
 * Composes the full details view for a single showing, including:
 * - Header and high-level showing metadata
 * - A summary details card
 * - A tabbed interface for extended information (e.g., seating, movie, references)
 *
 * This component assumes that {@link ShowingDetailsPageContext} has already
 * been provided higher in the tree and focuses solely on layout and composition.
 */

import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import ShowingDetailsHeader from "@/pages/showings/components/headers/ShowingDetailsHeader.tsx";
import ShowingDetailsCard from "@/pages/showings/components/details/ShowingDetailsCard.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import SeatMapDetailsPanelContextProvider
    from "@/pages/seatmap/context/details-panel-context/SeatMapDetailsPanelContextProvider.tsx";
import ShowingDetailsPageSeatingTab from "@/pages/showings/pages/details-page/tabs/ShowingDetailsPageSeatingTab.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {
    ShowingDetailsPageContext
} from "@/pages/showings/context/showing-details-page-context/ShowingDetailsPageContext.ts";

/**
 * Renders the core content of the Showing Details page.
 *
 * @remarks
 * - Reads the active showing from {@link ShowingDetailsPageContext}
 * - Uses a tabbed layout to separate seating, movie, and reference information
 * - Wraps the seating tab with {@link SeatMapDetailsPanelContextProvider}
 *   to enable seat-map inspection and editing
 *
 * @returns
 * The full Showing Details page content layout.
 */
const ShowingDetailsPageContent = () => {
    const {showing} = useRequiredContext({
        context: ShowingDetailsPageContext,
    });

    return (
        <PageFlexWrapper>
            {/* Header */}
            <ShowingDetailsHeader showing={showing}/>

            {/* Details Card */}
            <ShowingDetailsCard showing={showing}/>

            {/* Page Tabs */}
            <Tabs defaultValue="seating-tab">
                {/* Centered Tab Selector */}
                <div className="flex justify-center">
                    <TabsList>
                        <TabsTrigger value="seating-tab">Seating</TabsTrigger>
                        <TabsTrigger value="movie-tab">Movie</TabsTrigger>
                        <TabsTrigger value="reference-tab">Theatre & Screen</TabsTrigger>
                    </TabsList>
                </div>

                {/* Seating Tab */}
                <SeatMapDetailsPanelContextProvider>
                    <ShowingDetailsPageSeatingTab/>
                </SeatMapDetailsPanelContextProvider>

                {/* Movie Tab (placeholder) */}
                <TabsContent value="movie-tab" />

                {/* Theatre & Screen Tab (placeholder) */}
                <TabsContent value="reference-tab" />
            </Tabs>
        </PageFlexWrapper>
    );
};

export default ShowingDetailsPageContent;
