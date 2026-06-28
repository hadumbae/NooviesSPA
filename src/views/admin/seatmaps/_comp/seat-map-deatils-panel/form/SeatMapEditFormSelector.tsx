/**
 * @fileoverview Toggle control for switching between viewing and editing modes in the seat map details panel.
 *
 */

import WidePanelButton from "@/common/components/buttons/WidePanelButton.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {
    SeatMapDetailsPanelStateContext
} from "@/domains/seatmap/_ctx/details-panel-context/SeatMapDetailsPanelStateContext.ts";
import {Pencil, X} from "lucide-react";
import {SeatMapDetailsPanelSetterContext} from "@/domains/seatmap";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {ReactElement} from "react";

/**
 * Toggle button that enables or disables seat map edit mode.
 */
export function SeatMapEditFormSelector(): ReactElement {
    const {isEditing,} = useRequiredContext({context: SeatMapDetailsPanelStateContext});
    const {setIsEditing} = useRequiredContext({context: SeatMapDetailsPanelSetterContext});

    const icon = isEditing ? X : Pencil;
    const text = isEditing ? "Close" : "Edit Seat Map";

    return (
        <section>
            <SROnly as="h2" text="Select To Edit Seat Map"/>

            <WidePanelButton
                isActive={isEditing}
                setActive={setIsEditing}
                icon={icon}
                text={text}
            />
        </section>
    );
}
