import {FC} from 'react';
import ShowingSeatMapCard from "@/pages/seatmap/components/ShowingSeatMapCard.tsx";

import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

interface Props {
    seating: SeatMap[];
    onUpdate: (seatMap: SeatMap) => void;
    onDelete: () => void;
}

const ShowingSeatMapFilterList: FC<Props> = ({seating, onUpdate, onDelete}) => {
    return (
        <>
            {
                seating.map(seatMap =>
                    <ShowingSeatMapCard key={seatMap._id} seatMap={seatMap} onUpdate={onUpdate} onDelete={onDelete} />
                )
            }
        </>

    );
};

export default ShowingSeatMapFilterList;
