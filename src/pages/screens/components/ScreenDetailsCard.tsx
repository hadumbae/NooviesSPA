import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/base/ScreenSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";


interface Props {
    screen: Screen;
}

const ScreenDetailsCard: FC<Props> = ({screen}) => {
    const {
        name,
        capacity,
        screenType,
        theatre,
        seats,
    } = screen;

    const theatreID = (theatre as Theatre)._id;
    const theatreName = (theatre as Theatre).name;

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-5">
                <div className="flex justify-between items-center">
                    <DetailsCardSpan label="Name" text={name} />
                    <DetailsCardSpan label="Screen Type" text={screenType} />
                    <DetailsCardSpan label="Capacity" text={capacity} />
                    <DetailsCardSpan label="Reg. Seats" text={seats.length} />
                </div>

                <DetailsCardSpan
                    label="Reg. Seats"
                    text={theatreName}
                    to={`/admin/theatres/get/${theatreID}`}
                />
            </CardContent>
        </Card>
    );
};

export default ScreenDetailsCard;
