import {FC} from 'react';
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/common/components/ui/accordion.tsx";
import {SeatsByRow} from "@/pages/screens/schema/screen/ScreenSeat.types.ts";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import {isArray} from "lodash";
import ScreenSeatDetailsCard from "@/pages/seats/components/screen-seats/ScreenSeatDetailsCard.tsx";

type ItemProps = {
    value: string;
    rowData: SeatsByRow;
}

const SeatRowAccordionItem: FC<ItemProps> = ({value, rowData}) => {
    const {row, numberOfSeats, seats} = rowData;

    const hasSeats = isArray(seats) && seats.length > 0;

    return (
        <AccordionItem value={value}>
            <AccordionTrigger>
                <div className="w-full flex justify-between items-center pr-5">
                    <span>{row} </span>
                    <span>{numberOfSeats} seats</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                {
                    hasSeats && <>
                        <ScrollArea>
                            <section className="flex items-center space-x-3">
                                {seats.map(seat => <ScreenSeatDetailsCard
                                    key={seat._id}
                                    seat={seat}
                                    className="min-w-52"
                                />)}
                            </section>
                            <ScrollBar orientation="horizontal"/>
                        </ScrollArea>
                    </>
                }

                {
                    !hasSeats &&
                    <div className="h-14 flex justify-center items-center">
                        <span className="select-none text-neutral-400">There Are No Seats</span>
                    </div>
                }
            </AccordionContent>
        </AccordionItem>
    );
};

export default SeatRowAccordionItem;
