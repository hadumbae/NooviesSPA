import {FC} from 'react';
import {Screen, ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/common/components/ui/accordion.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {Pencil, Search, Trash} from "lucide-react";
import ScreenDeleteWarningDialog from "@/pages/screens/components/dialog/ScreenDeleteWarningDialog.tsx";
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import TheatreScreenFormDrawer
    from "@/pages/screens/components/theatre-screens/admin/forms/TheatreScreenFormDrawer.tsx";

type ScreenItemProps = {
    screen: ScreenDetails;
}

const TheatreScreenAccordionItem: FC<ScreenItemProps> = ({screen}) => {
    const {_id, name, screenType, seatCount, capacity, futureShowingCount, theatre} = screen;

    const simpleScreen: Screen = {...screen, theatre: theatre._id};

    return (
        <AccordionItem key={_id} value={`item-${_id}`}>
            <AccordionTrigger>
                <div className="w-full flex justify-between pr-2">
                    <span>{name}</span>
                    <span className="text-neutral-400 italic">{screenType}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-5">
                <section className="grid grid-cols-3 gap-3">
                    <DetailsCardSpan label="Capacity" text={`${capacity} seats`}/>
                    <DetailsCardSpan label="Registered Seats" text={`${seatCount} seats`}/>
                    <DetailsCardSpan label="Upcoming Showings" text={`${futureShowingCount} showings`}/>
                </section>

                <section className="flex justify-center items-center space-x-5">
                    <ButtonLink
                        to={`/admin/theatres/get/${theatre._id}/screen/${_id}`}
                        variant="outline"
                        size="sm"
                        target="_blank"
                    >
                        <Search/> Details
                    </ButtonLink>

                    <TheatreScreenFormDrawer theatreID={theatre._id} isEditing={true} screen={simpleScreen}>
                        <Button variant="outline" size="sm" className="text-neutral-400 hover:text-black">
                            <Pencil /> Editing
                        </Button>
                    </TheatreScreenFormDrawer>

                    <ScreenDeleteWarningDialog
                        screen={screen}
                        className={cn(
                            buttonVariants({variant: "outline", size: "sm"}),
                            "text-neutral-400 hover:text-black",
                        )}
                    >
                        <Trash/> Delete
                    </ScreenDeleteWarningDialog>
                </section>
            </AccordionContent>
        </AccordionItem>
    );
};

export default TheatreScreenAccordionItem;
