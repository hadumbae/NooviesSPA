import {SeatType} from "@/pages/seats/schema/SeatType.enum.ts";

import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export default interface ISeatSubmit {
    row: string,
    seatNumber: string,
    seatType?: SeatType,
    isAvailable: boolean,
    priceMultiplier: number | "",
    theatre?: ObjectId;
    screen?: ObjectId;
}