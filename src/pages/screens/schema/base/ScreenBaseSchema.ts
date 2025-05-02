import {z} from "zod";
import {IDString, TrimmedStringSchema} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {ScreenTypeEnum} from "@/pages/screens/schema/ScreenTypeEnum.ts";

export const ScreenBaseSchema = z.object({
    _id: IDString,

    name: TrimmedStringSchema
        .min(1, "Required.")
        .max(255, "Name must be 255 characters or less."),

    capacity: RequiredNumber
        .gt(0, "Capacity must be greater than 0"),

    screenType: ScreenTypeEnum,
});