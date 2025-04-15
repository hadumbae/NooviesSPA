import {FC} from 'react';
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import ShowingSeatMapCardOptions from "@/pages/seatmap/components/ShowingSeatMapCardOptions.tsx";
import DetailsCardBooleanIndicator from "@/common/components/text/DetailsCardBooleanIndicator.tsx";

interface Props {
    seatMap: SeatMap;
    onUpdate: (seatMap: SeatMap) => void;
    onDelete: (seatMap: SeatMap) => void;
}

const ShowingSeatMapCard: FC<Props> = ({seatMap, onUpdate, onDelete}) => {
    const {isAvailable, isReserved, price, seat} = seatMap;
    const {row, seatNumber, seatType} = seat as Seat;

    return (
        <Card>
            <CardContent className="py-2 pr-1 grid grid-cols-3 gap-1">
                <section className="col-span-2 grid grid-cols-2 gap-2">
                    <span className="font-extrabold text-lg underline underline-offset-8">{seatNumber}</span>
                    <div className="flex justify-end">
                        <ShowingSeatMapCardOptions
                            variant="link" className="text-neutral-400 hover:text-black"
                            seatMap={seatMap} onUpdate={onUpdate} onDelete={onDelete}
                        />
                    </div>

                    <DetailsCardSpan label="Row" text={row}/>
                    <DetailsCardSpan label="Seat Type" text={seatType}/>

                    <DetailsCardBooleanIndicator label="Available" className="text-[12px]" status={isAvailable} />
                    <DetailsCardBooleanIndicator label="Reserved" className="text-[12px]" status={isReserved} />
                </section>

                <section className="flex flex-col items-center justify-center">
                    <span className="text-[12px] text-neutral-500 uppercase">Price</span>
                    <span className="font-bold text-3xl">${price}</span>
                </section>
            </CardContent>
        </Card>
    );
};

export default ShowingSeatMapCard;
