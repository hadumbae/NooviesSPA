import {FC} from 'react';
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

type DetailsHeader = {
    theatre: TheatreDetails;
    screen: ScreenDetails;
};

const TheatreScreenDetailsHeader: FC<DetailsHeader> = ({theatre, screen}) => {
    const {name: theatreName} = theatre;
    const {name: screenName} = screen;

    return (
        <header>
            <HeaderTitle>
                {screenName} Details
            </HeaderTitle>
            <HeaderDescription>
                Screen at {theatreName}. Handle seats and showings here.
            </HeaderDescription>
        </header>
    );
};

export default TheatreScreenDetailsHeader;
