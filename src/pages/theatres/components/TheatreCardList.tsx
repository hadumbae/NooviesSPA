import {FC} from 'react';
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import TheatreListCard from "@/pages/theatres/components/TheatreListCard.tsx";

interface Props {
    theatres: Theatre[];
    onDelete: () => void;
}

const TheatreCardList: FC<Props> = ({theatres, onDelete}) => {
    if (theatres.length === 0) {
        return <PageCenter>
            <span className="text-neutral-500">There are no theatres.</span>
        </PageCenter>
    }

    return (
        theatres.map((theatre) => <TheatreListCard key={theatre._id} theatre={theatre} onDelete={onDelete} />)
    );
};

export default TheatreCardList;
