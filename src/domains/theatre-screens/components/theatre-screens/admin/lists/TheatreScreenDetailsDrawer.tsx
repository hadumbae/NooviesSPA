/**
 * @fileoverview Drawer-based summary component for a theatre screen.
 */

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/common/components/ui/drawer.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {CircleX} from "lucide-react";
import {SecondaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";
import {TheatreScreenWithVirtuals} from "@/domains/theatre-screens/schema/model";

/** Props for the TheatreScreenDetailsDrawer component. */
type DrawerProps = {
    screen: TheatreScreenWithVirtuals
};

/**
 * Displays a compact screen card that opens a drawer containing screen metadata.
 */
const TheatreScreenDetailsDrawer = ({screen}: DrawerProps) => {
    const {
        name,
        screenType,
        capacity,
        seatCount,
        futureShowingCount,
    } = screen;

    return (
        <Drawer fadeFromIndex={0} snapPoints={[]}>
            <DrawerTrigger>
                <Card>
                    <CardContent className="p-4 flex justify-between items-center">
                        <span className="font-bold">{name}</span>
                        <span className="text-neutral-400 italic">{screenType}</span>
                    </CardContent>
                </Card>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{name}</DrawerTitle>
                    <DrawerDescription>Theatre Screen Details</DrawerDescription>
                </DrawerHeader>

                <section className="px-4 grid grid-cols-3 gap-4">
                    <DetailsCardSpan label="Capacity" text={`${capacity} seats`}/>
                    <DetailsCardSpan label="Registered Seats" text={`${seatCount} seats`}/>
                    <DetailsCardSpan label="Upcoming Showings" text={`${futureShowingCount} showings`}/>
                </section>

                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline" className={SecondaryButtonCSS}>
                            <CircleX/>
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default TheatreScreenDetailsDrawer;