import {z, ZodType} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {ISO3166Alpha2CodeEnum} from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";
import {CoercedDateStringSchema} from "@/common/schema/dates/CoercedDateStringSchema.ts";
import {IPersonSubmit} from "@/pages/persons/interfaces/IPersonSubmit.ts";

export const PersonSubmitSchema: ZodType<IPersonSubmit> = z.object({
    name: NonEmptyStringSchema
        .min(3, "Must be at least 3 characters.")
        .max(255, "Name must not be more than 255 characters."),

    biography: NonEmptyStringSchema
        .min(1, "Required.")
        .max(1000, "Must be 1000 characters or less."),

    dob: CoercedDateStringSchema,

    nationality: z.union([z.literal(""), ISO3166Alpha2CodeEnum]).refine((v) => v, {message: "Required."}),
});

export type PersonSubmit = z.infer<typeof PersonSubmitSchema>;
