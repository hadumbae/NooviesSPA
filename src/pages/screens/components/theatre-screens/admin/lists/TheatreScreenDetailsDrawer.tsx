import {FC} from 'react';
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/common/components/ui/drawer.tsx";
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {CircleX} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import {SecondaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";

type DrawerProps = {
    screen: ScreenDetails
}

const TheatreScreenDetailsDrawer: FC<DrawerProps> = ({screen}) => {
    const {_id, name, screenType, capacity, seatCount, futureShowingCount, theatre: {_id: theatreID}} = screen;

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
                    <section className="flex space-x-2">
                        <LoggedAnchor
                            target="_blank"
                            href={`/admin/theatres/get/${theatreID}/screen/${_id}`}
                            className={cn(buttonVariants({variant: "primary"}), "flex-grow")}
                        >
                            More Details
                        </LoggedAnchor>

                        <DrawerClose asChild>
                            <Button variant="outline" className={SecondaryButtonCSS}>
                                <CircleX />
                            </Button>
                        </DrawerClose>
                    </section>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default TheatreScreenDetailsDrawer;
