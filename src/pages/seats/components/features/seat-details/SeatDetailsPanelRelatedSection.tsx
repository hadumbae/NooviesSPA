/**
 * @file SeatDetailsPanelRelatedSection
 * @description
 * Renders the **related navigation section** inside the Seat Details Context Panel.
 *
 * This section provides quick links to:
 * - The theatre that owns the seat
 * - The specific screen the seat belongs to
 *
 * Both links use {@link StackedIconCardLink} for a consistent card-based
 * navigation UI. When navigating to the screen, the seat-details panel is
 * automatically closed for UX clarity.
 *
 * This component must be rendered within the {@link SeatDetailsPanelContext}
 * provider.
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import {Theater, TvMinimal} from "lucide-react";
import StackedIconCardLink from "@/common/components/navigation/logged-link/StackedIconCardLink.tsx";

/**
 * Displays links to the **theatre** and **screen** associated with the
 * currently selected seat.
 *
 * This component reads the selected seat from
 * {@link SeatDetailsPanelContext}. If no seat is found, an error is thrown,
 * as the panel should only render when a seat is available.
 *
 * Behavior:
 * - Throws on missing seat in context.
 * - Shows two navigation cards:
 *   - Theatre (always available)
 *   - Screen (always available)
 * - Automatically closes the seat-details panel when navigating to the screen.
 *
 * @throws {Error}
 * Thrown when used without a seat in context.
 *
 * @returns {JSX.Element}
 * A 2-column grid of related navigation links.
 *
 * @example
 * ```tsx
 * <SeatDetailsPanelContextProvider>
 *   <SeatDetailsPanelRelatedSection />
 * </SeatDetailsPanelContextProvider>
 * ```
 */
const SeatDetailsPanelRelatedSection = () => {
    const {seat, setIsPanelOpen} = useRequiredContext({
        context: SeatDetailsPanelContext,
        message: "Must be used within provider for `SeatDetailsPanelContext`."
    });

    // ⚡ Throw Error If Seat Missing ⚡

    if (!seat) {
        throw new Error("Seat is missing in component.");
    }

    // ⚡ Render Links ⚡

    const {screen, theatre} = seat;

    return (
        <div className="grid grid-cols-2 gap-4 w-full">
            <StackedIconCardLink
                to={`/admin/theatres/get/${theatre._id}`}
                icon={Theater}
                text={theatre.name}
            />

            <StackedIconCardLink
                to={`/admin/theatres/get/${theatre._id}/screen/${screen._id}`}
                onClick={() => setIsPanelOpen(false)}
                icon={TvMinimal}
                text={screen.name}
            />
        </div>
    );
};

export default SeatDetailsPanelRelatedSection;
