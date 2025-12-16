import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import WidePanelButton from "@/common/components/buttons/WidePanelButton.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import { SeatMapDetailsPanelContext } from "@/pages/seatmap/context/details-panel-context/SeatMapDetailsPanelContext.ts";
import { Pencil, X } from "lucide-react";

/**
 * @component SeatMapEditFormSelector
 *
 * @description
 * Toggle control for enabling or disabling SeatMap edit mode within
 * the SeatMap details panel.
 *
 * Displays a single wide action button that switches between:
 * - **Edit Seat Map** (enter edit mode)
 * - **Close** (exit edit mode)
 *
 * The button state, icon, and label are derived from
 * `SeatMapDetailsPanelContext`.
 *
 * @remarks
 * - Uses `useRequiredContext` to ensure the details panel context is available.
 * - Intended for admin-facing SeatMap management workflows.
 */
const SeatMapEditFormSelector = () => {
    const { isEditing, setIsEditing } = useRequiredContext({
        context: SeatMapDetailsPanelContext,
    });

    const icon = isEditing ? X : Pencil;
    const text = isEditing ? "Close" : "Edit Seat Map";

    return (
        <section>
            <SectionHeader srOnly={true}>Select To Edit Seat Map</SectionHeader>

            <WidePanelButton
                isActive={isEditing}
                setActive={setIsEditing}
                icon={icon}
                text={text}
            />
        </section>
    );
};

export default SeatMapEditFormSelector;
