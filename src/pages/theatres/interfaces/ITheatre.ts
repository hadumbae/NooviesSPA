import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export default interface ITheatre {
    _id: ObjectId,
    name: string,
    location: string,
    seatCapacity: number,
}