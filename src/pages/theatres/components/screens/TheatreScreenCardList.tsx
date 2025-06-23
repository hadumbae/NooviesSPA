import {FC} from 'react';
import TheatreScreenCard from "@/pages/theatres/components/screens/TheatreScreenCard.tsx";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";

interface Props {
    screens: ScreenDetails[];
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
