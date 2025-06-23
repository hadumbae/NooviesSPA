import {FC} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";

interface Props {
    screen: Screen;
}

const TheatreScreenPreviewCard: FC<Props> = ({screen}) => {
    const {name, screenType, capacity} = screen;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="underline underline-offset-4">{name}</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-3">
                <DetailsCardSpan label="Screen Type" text={screenType} />
                <DetailsCardSpan label="Seat Capacity" text={`${capacity} seats`} />
            </CardContent>
        </Card>
    );
};

export default TheatreScreenPreviewCard;
