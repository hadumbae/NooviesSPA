import {z, ZodType} from "zod";
import {EmptyString, IDString, TrimmedStringSchema} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {ScreenTypeEnum} from "@/pages/screens/schema/ScreenTypeEnum.ts";
import {IScreenSubmit} from "@/pages/screens/interfaces/IScreenSubmit.ts";

export const ScreenSubmitSchema: ZodType<IScreenSubmit> = z.object({
    name: TrimmedStringSchema
        .min(1, "Required.")
        .max(255, "Name must be 255 characters or less."),

    capacity: z
        .union([EmptyString, RequiredNumber])
        .refine((isNum) => isNum !== "", {message: "Required"})
        .refine((num) => num >= 0, {message: "Must be 0 or greater."}),

    screenType: z
        .union([z.undefined(), ScreenTypeEnum])
        .refine((type) => !!type, {message: "Required."}),

    theatre: z
        .union([z.undefined(), IDString])
        .refine((theatre) => !!theatre, {message: "Required"}),
});

export type ScreenSubmit = z.infer<typeof ScreenSubmitSchema>;