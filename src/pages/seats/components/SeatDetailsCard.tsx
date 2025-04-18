import {FC} from 'react';
import {Seat} from "@/pages/seats/schema/SeatSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {Theatre} from "@/pages/theatres/schema/TheatreSchema.ts";
import {Screen} from "@/pages/screens/schema/base/ScreenSchema.ts";

interface Props {
    seat: Seat;
}

const SeatDetailsCard: FC<Props> = ({seat}) => {
    const {
        row,
        seatNumber,
        seatType,
        isAvailable,
        priceMultiplier,
        screen,
        theatre,
    } = seat;

    const theatreID = (theatre as Theatre)._id;
    const theatreName = (theatre as Theatre).name;

    const screenID = (screen as Screen).name;
    const screenName = (screen as Screen).name;

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-5">
                {/* Row | Seat Number */}
                <div className="flex justify-start items-center space-x-5">
                    <DetailsCardSpan label="Row" text={row} />
                    <DetailsCardSpan label="Seat Number" text={seatNumber} />
                </div>

                {/*Seat Type | Is Available | Price Multiplier*/}
                <div className="flex justify-between items-center">
                    <DetailsCardSpan label="Seat Type" text={seatType} />
                    <DetailsCardSpan label="Is Available?" text={isAvailable ? "Yes" : "No"} />
                    <DetailsCardSpan label="Price Multiplier" text={`x${priceMultiplier}`} />
                </div>

                {/* Theatre | Screen */}
                <div className="flex justify-start items-center space-x-5">
                    <DetailsCardSpan
                        label="Theatre" text={theatreName}
                        to={`/admin/theatres/get/${theatreID}`}
                    />

                    <DetailsCardSpan
                        label="Screen" text={screenName}
                        to={`/admin/screens/get/${screenID}`}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default SeatDetailsCard;
