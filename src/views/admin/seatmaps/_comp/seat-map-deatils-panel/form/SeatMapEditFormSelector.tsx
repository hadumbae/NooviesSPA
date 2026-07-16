/**
 * @fileoverview Toggle control for switching between viewing and editing modes in the seat map details panel.
 */

import {ReactElement} from "react";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {WidePanelButton} from "@/views/common/_comp";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {
    SeatMapDetailsPanelStateContext
} from "@/domains/seatmaps/_ctx/details-panel-context/SeatMapDetailsPanelStateContext.ts";
import {Pencil, X} from "lucide-react";
import {SeatMapDetailsPanelSetterContext} from "@/domains/seatmaps";

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
