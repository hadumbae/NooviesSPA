import { FC } from 'react';
import TheatreScreenPreviewCard from "@/pages/theatres/components/screens/preview/TheatreScreenPreviewCard.tsx";
import {Screen} from "@/pages/screens/schema/base/ScreenSchema.ts";

interface Props {
    screens: Screen[];
}

const TheatreScreensPreviewList: FC<Props> = ({screens}) => {
    return (
        <>
            {screens.map(screen => <TheatreScreenPreviewCard key={screen._id} screen={screen} />)}
        </>
    );
};

export default TheatreScreensPreviewList;
