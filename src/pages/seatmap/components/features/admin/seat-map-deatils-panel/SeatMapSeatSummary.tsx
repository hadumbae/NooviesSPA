import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import { cn } from "@/common/lib/utils.ts";
import SeatTypeLabelMap from "@/pages/seats/constants/SeatTypeLabelMap.ts";
import getSeatIdentifier from "@/pages/seats/utilities/formatters/get-seat-identifier/getSeatIdentifier.ts";
import { RoundedBorderCSS } from "@/common/constants/css/ContainerCSS.ts";

/**
 * @summary
 * Props for {@link SeatMapSeatSummary}.
 */
type SectionProps = {
    /**
     * The seat details object for a seat with `layoutType: "SEAT"`.
     */
    seat: Extract<SeatDetails, { layoutType: "SEAT" }>;
};

/**
 * @component SeatMapSeatSummary
 *
 * @description
 * Renders a summary section for a single physical seat within
 * the SeatMap details context panel.
 *
 * Displays:
 * - Human-readable seat identifier (row and number)
 * - Seat type label (e.g., Regular, VIP)
 * - Absolute X/Y coordinates within the screen layout
 *
 * @remarks
 * - Intended for admin-facing inspection and management views.
 * - Relies on `getSeatIdentifier` for consistent seat labeling.
 * - Uses `RoundedBorderCSS` to visually group seat metadata.
 */
const SeatMapSeatSummary = ({ seat }: SectionProps) => {
    const { x, y, seatType } = seat;

    const seatIdentifier = getSeatIdentifier(seat);
    const formattedXY = `X${x}, Y${y}`;
    const formattedSeatType = SeatTypeLabelMap[seatType];

    return (
        <section>
            <SectionHeader>Seat</SectionHeader>

            <div
                className={cn(
                    RoundedBorderCSS,
                    "space-y-1 py-2 px-5 flex justify-between items-center"
                )}
            >
                <DetailsCardSpan label="Seat" text={seatIdentifier} />
                <DetailsCardSpan label="Seat Type" text={formattedSeatType} />
                <DetailsCardSpan label="XY" text={formattedXY} />
            </div>
        </section>
    );
};

export default SeatMapSeatSummary;
