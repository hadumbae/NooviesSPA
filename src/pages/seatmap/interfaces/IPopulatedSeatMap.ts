import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";

import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";

export default interface IPopulatedSeatMap {
    readonly _id: ObjectId;
    isAvailable?: boolean,
    isReserved?: boolean,
    price: number,
    seat: Seat,
    showing: Showing,
}