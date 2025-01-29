import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ISeat from "@/pages/seats/interfaces/ISeat.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";

export default interface ISeatMap {
    readonly _id: ObjectId;
    isAvailable?: boolean,
    isReserved?: boolean,
    price: number,
    seat: ObjectId | ISeat,
    showing: ObjectId | IShowing,
}