import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import TheatreScreenCard from "@/pages/theatres/components/screens/TheatreScreenCard.tsx";

interface Props {
    screens: Screen[];
}

const TheatreScreenCardList: FC<Props> = ({screens}) => {
    return (
        <>
            {screens.map(
                (screen) => <TheatreScreenCard key={screen._id} screen={screen} />
            )}
        </>
    );
};

export default TheatreScreenCardList;
