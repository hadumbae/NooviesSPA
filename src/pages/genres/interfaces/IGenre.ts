import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export default interface IGenre {
    readonly _id: ObjectId;
    name: string;
    description: string;
    movies: (ObjectId | any)[];
}