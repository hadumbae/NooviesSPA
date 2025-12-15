import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import useOrganisedSeatingForLayout
    from "@/pages/seats/hooks/features/admin/screen-seat-layout/useOrganisedSeatingForLayout.ts";
import keyForSeatElement
    from "@/pages/seats/utilities/screen-seats/keyForSeatElement.ts";
import ShowingSeatMapElement
    from "@/pages/seatmap/components/features/admin/seat-map-layout/ShowingSeatMapElement.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * @type LayoutProps
 * @description
 * Props for {@link ShowingSeatMapLayout}.
 */
type LayoutProps = {
    /**
     * Seat-map entries for a single movie showing.
     */
    seating: SeatMapDetails[];

    /**
     * Optional class name applied to the root container.
     */
    className?: string;
};

/**
 * @component ShowingSeatMapLayout
 * @description
 * Renders the seat-map layout for a single movie showing.
 *
 * Organizes seat data into a normalized grid using
 * {@link useOrganisedSeatingForLayout}, then renders row labels
 * and seat elements using a CSS Grid layout.
 *
 * Intended for admin-facing showing management and seat-map inspection.
 */
const ShowingSeatMapLayout = ({seating, className}: LayoutProps) => {
    const {seatRowEntries, layoutGridStyle} = useOrganisedSeatingForLayout({seating});

    return (
        <div className={cn("space-y-2", className)}>
            {seatRowEntries.map(([y, rowSeats]) => (
                <div style={layoutGridStyle} key={y}>
                    <ShowingSeatMapElement element={y}/>

                    {rowSeats.map((element, index) => (
                        <ShowingSeatMapElement
                            key={keyForSeatElement(element, index)}
                            element={element}
                        />
                    ))}

                    <ShowingSeatMapElement element={y}/>
                </div>
            ))}
        </div>
    );
};

export default ShowingSeatMapLayout;
