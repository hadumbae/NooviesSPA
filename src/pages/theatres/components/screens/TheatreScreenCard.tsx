import {FC} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";

import {Search, Trash} from "lucide-react";
import {Button} from "@/common/components/ui/button.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";
import {ScreenDetails} from "@/pages/screens/schema/screen/Screen.types.ts";
import {Link} from "react-router-dom";
import ScreenDeleteWarningDialog from "@/pages/screens/components/dialog/ScreenDeleteWarningDialog.tsx";

interface Props {
    screen: ScreenDetails;
    onDelete?: () => void
}

const TheatreScreenCard: FC<Props> = ({screen, onDelete}) => {
    const {_id, theatre, name, screenType, capacity, seatCount, futureShowingCount} = screen;

    return (
        <Card>
            <CardHeader className="p-5">
                <CardTitle className="flex justify-between items-center">
                    <Link
                        to={`/admin/screens/get/${_id}`}
                        className="hover:underline hover:underline-offset-4"
                        target="_blank"
                    >
                        {name}
                    </Link>

                    <section className="flex items-center space-x-2 text-neutral-500">
                        <ButtonLink
                            to={`/admin/theatres/get/${theatre._id}/screen/${_id}`}
                            variant="outline"
                            size="sm"
                        >
                            <Search />
                        </ButtonLink>

                        <ScreenDeleteWarningDialog screenID={_id} screenName={name} onSubmitSuccess={onDelete}>
                            <Button variant="link" size="sm" className="text-neutral-400 hover:text-black">
                                <Trash/> Delete
                            </Button>
                        </ScreenDeleteWarningDialog>
                    </section>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 p-5 pt-0">
                <section className="grid grid-cols-3 gap-1">
                    <DetailsCardSpan label="Screen Type" text={screenType}/>
                    <DetailsCardSpan label="Seats / Capacity" text={`${seatCount} / ${capacity} seats`}/>
                    <DetailsCardSpan label="Upcoming Showings" text={`${futureShowingCount} showings`}/>
                </section>
            </CardContent>
        </Card>
    );
};

export default TheatreScreenCard;
