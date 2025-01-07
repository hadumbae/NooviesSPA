import {z, ZodType} from "zod";
import {IPersonSubmit} from "@/pages/persons/interfaces/IPersonSubmit.ts";
import {RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {CoercedDate} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {CountryEnum} from "@/common/schema/helpers/ZodEnumHelpers.ts";

export const PersonSubmitSchema: ZodType<IPersonSubmit> = z.object({
    name: RequiredString
        .min(3, "Must be at least 3 characters.")
        .max(255, "Name must not be more than 255 characters."),

    biography: RequiredString
        .min(1, "Required.")
        .max(1000, "Must be 1000 characters or less."),

    dob: CoercedDate,

    nationality: CountryEnum,
});

export type PersonSubmit = z.infer<typeof PersonSubmitSchema>;