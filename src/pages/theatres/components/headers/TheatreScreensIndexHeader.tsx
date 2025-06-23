import {FC} from 'react';
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Plus, Search} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import TheatreScreenFormDrawer from "@/pages/screens/components/forms/TheatreScreenFormDrawer.tsx";

import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";

interface Props {
    theatre: Theatre;
    onScreenSubmit: (screen: Screen) => void;
}

const TheatreScreensIndexHeader: FC<Props> = ({theatre, onScreenSubmit}) => {
    const {_id, name} = theatre;

    return (
        <header className={cn("flex", "justify-between items-center")}>
            <section>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Theatre's Screens</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <HeaderLink variant="link" to={`/admin/theatres/get/${_id}`}>
                    <Search /> Theatre
                </HeaderLink>

                <TheatreScreenFormDrawer theatreID={theatre._id} onSubmit={onScreenSubmit}>
                    <Button variant="link" className="text-neutral-400 hover:text-black p-2">
                        <Plus /> Screen
                    </Button>
                </TheatreScreenFormDrawer>
            </section>
        </header>

    );
};

export default TheatreScreensIndexHeader;
