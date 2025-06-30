import {FC} from 'react';
import TheatreScreenDetailsDrawer
    from "@/pages/screens/components/theatre-screens/admin/lists/TheatreScreenDetailsDrawer.tsx";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";

type DrawerListProps = {
    screens: ScreenDetails[];
};

const TheatreScreenDetailsDrawerList: FC<DrawerListProps> = ({screens}) => {
    return (screens.map(screen => <TheatreScreenDetailsDrawer screen={screen} />));
};

export default TheatreScreenDetailsDrawerList;
