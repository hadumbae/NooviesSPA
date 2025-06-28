import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Plus} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import TheatreScreenFormDrawer from "@/pages/screens/components/forms/TheatreScreenFormDrawer.tsx";

import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

interface Props {
    theatre: TheatreDetails;
    onScreenSubmit?: (screen: Screen) => void;
}

const TheatreScreensIndexHeader: FC<Props> = ({theatre, onScreenSubmit}) => {
    const {name} = theatre;

    return (
        <header className={cn("flex", "justify-between items-center")}>
            <section>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Theatre's Screens</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <TheatreScreenFormDrawer theatreID={theatre._id} onSubmitSuccess={onScreenSubmit}>
                    <Button variant="link" className="text-neutral-400 hover:text-black p-2">
                        <Plus /> Screen
                    </Button>
                </TheatreScreenFormDrawer>
            </section>
        </header>

    );
};

export default TheatreScreensIndexHeader;
