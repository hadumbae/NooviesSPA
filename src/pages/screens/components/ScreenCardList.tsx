import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import ScreenListCard from "@/pages/screens/components/ScreenListCard.tsx";

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
