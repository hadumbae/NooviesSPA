import { SeatMapDetails } from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import { cn } from "@/common/lib/utils.ts";
import { RoundedBorderCSS } from "@/common/constants/css/ContainerCSS.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";

/**
 * @summary
 * Props for {@link SeatMapDetailsSummary}.
 */
type SectionProps = {
    /**
     * Fully populated SeatMap details including pricing and status metadata.
     */
    seatMap: SeatMapDetails;
};

/**
 * @component SeatMapDetailsSummary
 *
 * @description
 * Summary section for an individual SeatMap entry within the details panel.
 *
 * Presents pricing breakdown and seat availability state, including:
 * - Base price
 * - Price multiplier
 * - Optional override price
 * - Computed final price
 * - Normalized status label
 *
 * @remarks
 * - Uses `DetailsCardSpan` for consistent label-value formatting.
 * - Applies `RoundedBorderCSS` for visual grouping.
 */
const SeatMapDetailsSummary = ({ seatMap }: SectionProps) => {
    const { basePrice, priceMultiplier, overridePrice, finalPrice, status } = seatMap;

    const formattedPrice = overridePrice ?? "None";
    const formattedStatus = convertToTitleCase(status);

    return (
        <section>
            <SectionHeader>Seat Map</SectionHeader>

            <div className={cn(RoundedBorderCSS, "space-y-1 py-2 px-5")}>
                <div className="flex justify-between items-center">
                    <DetailsCardSpan label="Base Price" text={basePrice} />
                    <DetailsCardSpan label="x Price" text={`x${priceMultiplier}`} />
                    <DetailsCardSpan label="Override" text={formattedPrice} />
                </div>

                <div className="flex justify-center items-center space-x-10">
                    <DetailsCardSpan label="Final Price" text={finalPrice} />
                    <DetailsCardSpan label="Status" text={formattedStatus} />
                </div>
            </div>
        </section>
    );
};

export default SeatMapDetailsSummary;
