import {FC} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {Link} from "react-router-dom";

interface Props {
    screen: Screen;
}

const TheatreScreenPreviewCard: FC<Props> = ({screen}) => {
    const {_id, name, screenType, capacity} = screen;

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Link className="underline underline-offset-4" to={`/admin/screens/get/${_id}`} target="_blank">
                        {name}
                    </Link>
                </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-3 gap-4">
                <DetailsCardSpan label="Screen Type" text={screenType}/>
                <DetailsCardSpan label="Seat Capacity" text={`${capacity} seats`}/>
                <DetailsCardSpan label="Registered Seats" text={`${capacity} seats`}/>
            </CardContent>
        </Card>
    );
};

export default TheatreScreenPreviewCard;
