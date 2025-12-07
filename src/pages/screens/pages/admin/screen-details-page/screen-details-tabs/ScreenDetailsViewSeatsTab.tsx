/**
 * @file ScreenDetailsViewSeatsTab
 * @description
 * Tab content for the **Screen Details Page**, responsible for rendering the
 * interactive seat layout of a theatre screen and—when applicable—the seat
 * details sidebar.
 *
 * The component displays:
 * - A scrollable seat layout grid for the selected screen.
 * - A contextual seat details panel when a seat is selected via
 *   {@link SeatDetailsPanelContext}.
 *
 * This tab is part of the `ScreenDetailsPage` and is one of the selectable
 * tabs within its `<Tabs />` structure.
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import ScreenSeatLayout from "@/pages/seats/components/features/screen-seats/ScreenSeatLayout.tsx";
import SeatDetailsContextPanel from "@/pages/seats/components/features/seat-details/SeatDetailsContextPanel.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import {ReactElement} from "react";

type TabProps = {
    /**
     * All seat and structural layout elements for the selected screen.
     * Provided by the parent Screen Details Page.
     */
    seats: SeatDetails[];
};

/**
 * Seats Tab inside the **Screen Details Page**.
 *
 * This component renders the seat layout for a theatre screen and conditionally
 * displays a seat details sidebar when a seat is selected.
 *
 * Context:
 * - Requires {@link SeatDetailsPanelContext}. An error is thrown if the component
 *   is used outside of the provider.
 * - Renders `<SeatDetailsContextPanel />` only when `context.seat` exists.
 *
 * Layout:
 * - Scrollable seat grid rendered via {@link ScreenSeatLayout}
 * - Optional contextual sidebar for the selected seat
 *
 * @param props.seats - The seat list belonging to the screen displayed on the page.
 *
 * @returns {ReactElement}
 * A `<TabsContent>` element showing the seat layout tab for the screen details page.
 *
 * @example
 * ```tsx
 * <SeatDetailsPanelContextProvider>
 *   <Tabs defaultValue="view-seats">
 *     <ScreenDetailsViewSeatsTab seats={screen.seats} />
 *   </Tabs>
 * </SeatDetailsPanelContextProvider>
 * ```
 */
const ScreenDetailsViewSeatsTab = (props: TabProps): ReactElement => {
    // ⚡ Props ⚡
    const {seats} = props;

    // ⚡ Access Selected Seat from Context ⚡
    const {seat} = useRequiredContext({
        context: SeatDetailsPanelContext,
        message: "Must be used within provider for `SeatDetailsPanelContext`."
    });

    // ⚡ Render ⚡

    return (
        <TabsContent value="view-seats">
            <section>
                <SectionHeader>Seat Layout</SectionHeader>

                <ScrollArea className="w-full p-2">
                    <ScreenSeatLayout seats={seats}/>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            </section>

            {seat && <SeatDetailsContextPanel/>}
        </TabsContent>
    );
};

export default ScreenDetailsViewSeatsTab;
