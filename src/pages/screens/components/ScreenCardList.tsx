import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import ScreenListCard from "@/pages/screens/components/ScreenListCard.tsx";

interface Props {
    screens: Screen[];
    onDelete: () => void;
}

const ScreenCardList: FC<Props> = ({screens, onDelete}) => {
    if (screens.length === 0) {
        return <PageCenter>
            <span className="text-neutral-500">There are no screens.</span>
        </PageCenter>
    }

    return (
        screens.map((screen) => <ScreenListCard key={screen._id} screen={screen} onDelete={onDelete} />)
    );
};

export default ScreenCardList;
