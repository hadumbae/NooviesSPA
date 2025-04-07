import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";

import {Link} from "react-router-dom";
import {Link as LinkIcon} from "lucide-react";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    screen: Screen;
}

const TheatreScreenCard: FC<Props> = ({screen}) => {
    const {_id, name, screenType, capacity, seats} = screen;

    const screenCapacity = `${capacity} seats`;
    const numberOfSeats = `${seats.length} seats`;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{name}</span>

                    <Link
                        to={`/admin/screens/get/${_id}`}
                        className={cn(
                            buttonVariants({variant: "outline", size: "sm"}),
                            "px-2 h-6",
                            "text-neutral-400"
                        )}
                    >
                        <LinkIcon /> Details
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <section className="grid grid-cols-3 gap-1">
                    <DetailsCardSpan label="Screen Type" text={screenType} />
                    <DetailsCardSpan label="Capacity" text={screenCapacity} />
                    <DetailsCardSpan label="Registered Seats" text={numberOfSeats} />
                </section>

                <section>
                    <span className="text-[12px] text-neutral-500 uppercase">Showings</span>
                    {/*#TODO Showings*/}
                </section>
            </CardContent>
        </Card>
    );
};

export default TheatreScreenCard;
