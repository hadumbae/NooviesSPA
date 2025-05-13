import {z, ZodType} from "zod";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {ScreenTypeEnum} from "@/pages/screens/schema/ScreenTypeEnum.ts";
import {IScreenSubmit} from "@/pages/screens/interfaces/IScreenSubmit.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {EmptyStringSchema} from "@/common/schema/strings/EmptyStringSchema.ts";

export const ScreenSubmitSchema: ZodType<IScreenSubmit> = z.object({
    name: NonEmptyStringSchema
        .min(1, "Required.")
        .max(255, "Name must be 255 characters or less."),

    capacity: z
        .union([EmptyStringSchema, RequiredNumber])
        .refine((isNum) => isNum !== "", {message: "Required"})
        .refine((num) => num >= 0, {message: "Must be 0 or greater."}),

    screenType: z
        .union([z.undefined(), ScreenTypeEnum])
        .refine((type) => !!type, {message: "Required."}),

    theatre: z
        .union([z.undefined(), IDStringSchema])
        .refine((theatre) => !!theatre, {message: "Required"}),
});

export type ScreenSubmit = z.infer<typeof ScreenSubmitSchema>;