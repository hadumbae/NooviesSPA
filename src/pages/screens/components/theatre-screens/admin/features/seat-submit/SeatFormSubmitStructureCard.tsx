/**
 * @file SeatFormSubmitStructureCard.tsx
 *
 * ⚡ SeatFormSubmitStructureCard
 *
 * Renders a single card for a structural element whose `layoutType`
 * is **not** "SEAT" (e.g., AISLE, STAIR). Displays row label, structure
 * type from `SeatLayoutTypeLabelMap`, and coordinates.
 *
 * ⚡ Responsibilities
 * - Render non-seat structural metadata (row, layout type, coordinates)
 * - Provide a remove button calling the parent’s `removeSeat` callback
 * - Rely on the parent to supply only non-"SEAT" layout types
 *
 * ⚡ Type Safety Notes
 * - This component does **not** perform a runtime `layoutType` check.
 * - Correct subtype (`layoutType !== "SEAT"`) is enforced by:
 *   1. The parent component’s rendering logic, and
 *   2. TypeScript’s `Extract<>` prop type for `seat`.
 * - Because both conditions guarantee correctness, a runtime guard
 *   would be redundant and is intentionally omitted.
 *
 * ⚡ Example
 * ```tsx
 * <SeatFormSubmitStructureCard
 *   seat={structureSeat}
 *   removeSeat={(id) => setSeats(prev => prev.filter(s => s._id !== id))}
 * />
 * ```
 */

import { Card, CardContent } from "@/common/components/ui/card.tsx";
import { HeaderTextCSS, SecondaryTextBaseCSS } from "@/common/constants/css/TextCSS.ts";
import SeatLayoutTypeLabelMap from "@/pages/seats/constants/SeatLayoutTypeLabelMap.ts";
import { cn } from "@/common/lib/utils.ts";
import { Button } from "@/common/components/ui/button.tsx";
import { X } from "lucide-react";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Props for {@link SeatFormSubmitStructureCard}.
 */
type CardProps = {
    /** The seat entity to render. Must **not** have `layoutType` === "SEAT". */
    seat: Extract<SeatDetails, { layoutType: "AISLE" | "STAIR" }>;

    /** Callback to remove the seat/structure from the parent list. Receives the seat `_id`. */
    removeSeat: (_id: ObjectId) => void;
};

/**
 * ⚡ SeatFormSubmitStructureCard Component
 *
 * Renders a card for a structural (non-seat) map element.
 * Assumes the parent has already ensured the correct `layoutType`.
 *
 * @component
 * @param seat - Structural seat details (AISLE or STAIR).
 * @param removeSeat - Callback to remove this element from the parent list.
 * @returns JSX.Element
 */

const SeatFormSubmitStructureCard = ({ seat, removeSeat }: CardProps) => {
    const { _id, row, layoutType, x, y } = seat;

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
                            className="px-1 py-0 rounded-3xl"
                            onClick={() => removeSeat(_id)}
                        >
                            <X />
                        </Button>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
};

export default SeatFormSubmitStructureCard;
