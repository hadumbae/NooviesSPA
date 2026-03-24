import {FC} from 'react';
import TheatreScreenDetailsDrawer
    from "@/domains/theatre-screens/components/theatre-screens/admin/lists/TheatreScreenDetailsDrawer.tsx";

import {TheatreScreenDetails} from "@/domains/theatre-screens/schema/model";

type DrawerListProps = {
    screens: TheatreScreenDetails[];
};

const TheatreScreenDetailsDrawerList: FC<DrawerListProps> = ({screens}) => {
    return (screens.map(screen => <TheatreScreenDetailsDrawer screen={screen} />));
};

export default TheatreScreenDetailsDrawerList;
