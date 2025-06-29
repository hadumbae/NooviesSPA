import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {SeatType} from "@/pages/seats/schema/SeatType.enum.ts";

export default interface ISeatBase {
    readonly _id: ObjectId
    row: string;
    seatNumber: string;
    seatType: SeatType;
    isAvailable: boolean;
    priceMultiplier: number;
}