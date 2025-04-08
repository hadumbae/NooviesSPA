import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import TheatreScreenCard from "@/pages/theatres/components/screens/TheatreScreenCard.tsx";

interface Props {
    screens: Screen[];
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
