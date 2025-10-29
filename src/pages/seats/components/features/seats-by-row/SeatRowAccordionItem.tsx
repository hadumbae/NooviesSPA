import { FC } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/ui/accordion.tsx";
import { SeatsByRow } from "@/pages/screens/schema/screen/ScreenSeat.types.ts";
import { ScrollArea, ScrollBar } from "@/common/components/ui/scroll-area.tsx";
import { isArray } from "lodash";
import ScreenSeatDetailsCard from "@/pages/seats/components/features/screen-seats/ScreenSeatDetailsCard.tsx";

/**
 * Props for the {@link SeatRowAccordionItem} component.
 */
type ItemProps = {
    /** Unique value for the accordion item. */
    value: string;

    /** Data for the seat row, including row label, number of seats, and seat details. */
    rowData: SeatsByRow;
};

/**
 * An accordion item representing a single row of seats within a screen.
 *
 * Displays the row label, the number of seats, and a horizontally scrollable
 * list of seat detail cards. If the row has no seats, a placeholder message
 * is shown instead.
 *
 * @component
 * @param props - Component props.
 * @param props.value - Unique value used by the accordion item.
 * @param props.rowData - Seat row data including the row label, number of seats, and seat objects.
 *
 * @returns A JSX element representing an accordion item for a seat row.
 */
const SeatRowAccordionItem: FC<ItemProps> = ({ value, rowData }) => {
    const { row, numberOfSeats, seats } = rowData;

    /** Whether this row contains any seats. */
    const hasSeats = isArray(seats) && seats.length > 0;

    /** JSX section to display seats if they exist in the row. */
    const hasSeatsSection = (
        <section>
            <h1 className="sr-only">Seats By Row : Has Seats</h1>

            <ScrollArea>
                <div className="flex items-center space-x-3">
                    {seats.map(seat => (
                        <ScreenSeatDetailsCard key={seat._id} seat={seat} className="min-w-52" />
                    ))}
                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    );

    /** JSX section to display if the row has no seats. */
    const hasNoSeatsSection = (
        <section>
            <h1 className="sr-only">Seats By Row : Has No Seats</h1>

            <div className="h-14 flex justify-center items-center">
                <span className="select-none text-neutral-400">There Are No Seats</span>
            </div>
        </section>
    );

    return (
        <AccordionItem value={value}>
            <AccordionTrigger>
                <div className="w-full flex justify-between items-center pr-5">
                    <span>{row} </span>
                    <span>{numberOfSeats} seats</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                {hasSeats ? hasSeatsSection : hasNoSeatsSection}
            </AccordionContent>
        </AccordionItem>
    );
};

export default SeatRowAccordionItem;
