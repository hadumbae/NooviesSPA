import {FC} from 'react';
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import SeatListCard from "@/pages/seats/components/SeatListCard.tsx";

interface Props {
    seats: Seat[];
    onDelete: () => void;
}

const SeatCardList: FC<Props> = ({seats, onDelete}) => {
    return (
        seats.map((seat) => <SeatListCard key={seat._id} seat={seat} onDelete={onDelete} />)
    );
};

export default SeatCardList;
