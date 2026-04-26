/**
 * @fileoverview Card component for structural theatre elements (e.g., Aisles, Stairs),
 * displaying coordinates and type metadata without seat-specific properties.
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {HeaderTextCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import SeatLayoutTypeLabelMap from "@/domains/seats/constants/SeatLayoutTypeLabelMap.ts";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {X} from "lucide-react";
import {SeatDetails} from "@/domains/seats/schema/seat/SeatDetails.types.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReactElement} from "react";

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
                    <h1 className={HeaderTextCSS}>
                        {row} • {SeatLayoutTypeLabelMap[layoutType]}
                    </h1>

                    <div className="flex items-center space-x-2">
                        <span className={cn(SecondaryTextBaseCSS, "select-none text-sm")}>
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