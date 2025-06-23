import {FC} from 'react';
import ScreenListCard from "@/pages/screens/components/ScreenListCard.tsx";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";

interface Props {
    screens: Screen[];
    onDelete: () => void;
}

const ScreenCardList: FC<Props> = ({screens, onDelete}) => {
    return (
        screens.map((screen) => <ScreenListCard key={screen._id} screen={screen} onDelete={onDelete} />)
    );
};

export default ScreenCardList;
