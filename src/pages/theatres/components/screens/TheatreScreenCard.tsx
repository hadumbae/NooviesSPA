import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";

import {Link as LinkIcon, Trash} from "lucide-react";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import ScreenDeleteWarningDialog from "@/pages/screens/components/dialog/ScreenDeleteWarningDialog.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";

interface Props {
    screen: Screen;
    onDelete?: () => void
}

const TheatreScreenCard: FC<Props> = ({screen, onDelete}) => {
    const {_id, name, screenType, capacity, seats, showings} = screen;

    console.log(showings);

    const screenCapacity = `${capacity} seats`;
    const numberOfSeats = `${seats.length} seats`;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{name}</span>

                    <section className="flex items-center space-x-2 text-neutral-500">
                        <ButtonLink
                            to={`/admin/screens/get/${_id}`}
                            variant="outline"
                            size="sm"
                        >
                            <LinkIcon /> Details
                        </ButtonLink>

                        <ScreenDeleteWarningDialog
                            className={buttonVariants({variant: "outline", size: "sm"})}
                            screen={screen}
                            onDelete={onDelete}
                        >
                            <Trash /> Delete
                        </ScreenDeleteWarningDialog>
                    </section>
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
