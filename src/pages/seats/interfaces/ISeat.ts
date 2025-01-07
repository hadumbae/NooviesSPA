import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import {SeatType} from "@/pages/seats/schema/SeatTypeEnum.ts";

export default interface ISeat {
    readonly _id: ObjectId
    row: string;
    seatNumber: string;
    seatType: SeatType;
    isAvailable: boolean;
    priceMultiplier: number;
    screen: ObjectId | IScreen;
    theatre: ObjectId | ITheatre;
}