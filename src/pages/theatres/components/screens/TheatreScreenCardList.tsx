import {FC} from 'react';
import TheatreScreenCard from "@/pages/theatres/components/screens/TheatreScreenCard.tsx";
import {TheatreScreen} from "@/pages/screens/schema/theatre/TheatreScreenSchema.ts";

interface Props {
    screens: TheatreScreen[];
    onDelete?: () => void;
}

const TheatreScreenCardList: FC<Props> = ({screens, onDelete}) => {
    return (
        <>
            {screens.map(
                (screen) => <TheatreScreenCard key={screen._id} screen={screen} onDelete={onDelete} />
            )}
        </>
    );
};

export default TheatreScreenCardList;
