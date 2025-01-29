import {FC} from 'react';
import {SeatMap} from "@/pages/seatmap/schema/SeatMapSchema.ts";
import ShowingSeatMapCompactCard from "@/pages/showings/components/seatmap/ShowingSeatMapCompactCard.tsx";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    seating: SeatMap[];
    className?: string;
}

const ShowingSeatMapCompactList: FC<Props> = ({seating, className}) => {
    const seatingSlice = seating.slice(0, 10);

    if (seatingSlice.length === 0 ) {
        return <div className="flex justify-center">
            <span className="text-neutral-500 italic">No Seating Found</span>
        </div>
    }

    return (
        <div className={cn(className || "grid grid-cols-2 gap-4")}>
            {
                seatingSlice.map(
                    seatMap =>
                        <ShowingSeatMapCompactCard
                            key={seatMap._id}
                            seatMap={seatMap}
                        />
                )
            }
        </div>
    );
};

export default ShowingSeatMapCompactList;
