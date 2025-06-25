import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {TheatreDetails} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

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

    const theatreID = (theatre as TheatreDetails)._id;
    const theatreName = (theatre as TheatreDetails).name;

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
