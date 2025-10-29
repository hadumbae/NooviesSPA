import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

export default interface ISeatMapSubmit {
    isAvailable?: boolean,
    isReserved?: boolean,
    price: number | "",
    seat?: ObjectId,
    showing?: ObjectId,
}