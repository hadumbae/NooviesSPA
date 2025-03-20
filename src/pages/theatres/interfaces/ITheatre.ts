import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import ISeat from "@/pages/seats/interfaces/ISeat.ts";

export default interface ITheatre {
    _id: ObjectId,
    name: string,
    location: string,
    seatCapacity: number,
    screens: (ObjectId | IScreen)[],
    seats: (ObjectId | ISeat)[],
}