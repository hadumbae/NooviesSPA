import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";

export default interface IGenre {
    readonly _id: ObjectId;
    name: string;
    description: string;
    movies: (ObjectId | any)[];
}