import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";

export default interface ISeatMapSubmit {
    isAvailable?: boolean,
    isReserved?: boolean,
    price: number | "",
    seat?: ObjectId,
    showing?: ObjectId,
}