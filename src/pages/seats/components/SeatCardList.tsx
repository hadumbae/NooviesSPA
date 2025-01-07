import {FC} from 'react';
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import SeatListCard from "@/pages/seats/components/SeatListCard.tsx";

interface Props {
    seats: Seat[];
    onDelete: () => void;
}

const SeatCardList: FC<Props> = ({seats, onDelete}) => {
    if (seats.length === 0) {
        return <PageCenter>
            <span className="text-neutral-500">There are no seats.</span>
        </PageCenter>
    }

    return (
        seats.map((seat) => <SeatListCard key={seat._id} seat={seat} onDelete={onDelete} />)
    );
};

export default SeatCardList;
