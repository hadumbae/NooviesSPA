import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";


import {Showing} from "@/domains/showings/schema/showing/ShowingSchema.ts";

export default interface ISeatMap {
    readonly _id: ObjectId;
    isAvailable?: boolean,
    isReserved?: boolean,
    price: number,
    seat: ObjectId | Seat,
    showing: ObjectId | Showing,
}