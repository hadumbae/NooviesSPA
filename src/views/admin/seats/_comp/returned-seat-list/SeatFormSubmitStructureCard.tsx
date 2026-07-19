/**
 * @fileoverview Card component for structural theatre elements (e.g., Aisles, Stairs),
 * displaying coordinates and type metadata without seat-specific properties.
 */

import {ReactElement} from "react";
import {X} from "lucide-react";
import {ObjectId} from "@/common/_schemas";
import {Button, Card, CardContent} from "@/views/common/_comp/ui";

import {SeatDetails, SeatLayoutTypeLabelMap} from "@/domains/seats";
import {PageSectionHeader} from "@/views/common/_comp/page";

/** Props for the SeatFormSubmitStructureCard component. */
type CardProps = {
    seat: Extract<SeatDetails, { layoutType: "AISLE" | "STAIR" }>;
    removeSeat: (_id: ObjectId) => void;
};

/**
 * Renders a compact card for non-seat layout elements, emphasizing their row and coordinate placement.
 */
export function SeatFormSubmitStructureCard({seat, removeSeat}: CardProps): ReactElement {
    const {_id, row, layoutType, x, y} = seat;

    return (
        <Card key={_id}>
            <CardContent className="px-5 py-2 space-y-2">
                <section className="flex justify-between items-center">
                    <PageSectionHeader as="h2" text={`${row} • ${SeatLayoutTypeLabelMap[layoutType]}`}/>

                    <div className="flex items-center space-x-2">
                        <span className="secondary-text select-none text-sm">
                            X{x}, Y{y}
                        </span>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => removeSeat(_id)}
                        >
                            <X className="h-4 w-4"/>
                        </Button>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
}