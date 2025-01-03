import {z} from "zod";
import {IDString, ObjectId, RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {ZodType} from "zod";

export default interface IGenre {
    readonly _id: ObjectId;
    name: string;
    description: string;
    movies: (ObjectId | any)[];
}

export const GenreSchema: ZodType<IGenre> = z.object({
    _id: IDString,

    name: RequiredString
        .min(3, "Must be 3 characters or longer.")
        .max(255, "Must be 255 characters or less."),

    description: RequiredString
        .max(1000, "Must be 1000 characters or less."),

    movies: z
        .array(z.union([IDString, z.any()])),
});

export type Genre = z.infer<typeof GenreSchema>;