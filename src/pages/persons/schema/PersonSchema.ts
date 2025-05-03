import {z, type ZodType} from 'zod';
import IPerson from "@/pages/persons/interfaces/IPerson.ts";
import {IDString, TrimmedStringSchema} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {CountryEnum} from "@/common/schema/helpers/ZodEnumHelpers.ts";
import {CloudinaryImageObject} from "@/common/schema/objects/CloudinaryImageObject.ts";
import {CoercedDateSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";

export const PersonSchema: ZodType<IPerson> = z.object({
    _id: IDString.readonly(),

    name: TrimmedStringSchema
        .min(3, "Must be at least 3 characters.")
        .max(255, "Name must not be more than 255 characters."),

    biography: TrimmedStringSchema
        .min(1, "Required.")
        .max(1000, "Must be 1000 characters or less."),

    dob: CoercedDateSchema,

    nationality: CountryEnum,

    profileImage: z
        .union([z.null(), CloudinaryImageObject.readonly()]),

    movies: z
        .array(z.union([IDString, z.any()])),
});

export const PersonArraySchema = z.array(PersonSchema);

export type Person = z.infer<typeof PersonSchema>;
export type Persons = z.infer<typeof PersonArraySchema>;