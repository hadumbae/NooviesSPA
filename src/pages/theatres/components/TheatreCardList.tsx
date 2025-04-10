import {FC} from 'react';
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import TheatreListCard from "@/pages/theatres/components/TheatreListCard.tsx";

interface Props {
    theatres: Theatre[];
    onDelete: () => void;
}

const TheatreCardList: FC<Props> = ({theatres, onDelete}) => {
    return (
        theatres.map((theatre) => <TheatreListCard key={theatre._id} theatre={theatre} onDelete={onDelete} />)
    );
};

export default TheatreCardList;
