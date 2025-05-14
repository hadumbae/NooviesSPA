import {z} from "zod";
import {ScreenTypeEnum} from "@/pages/screens/schema/ScreenTypeEnum.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";

export const ScreenBaseSchema = z.object({
    _id: IDStringSchema,

    name: NonEmptyStringSchema
        .min(1, "Required.")
        .max(255, "Name must be 255 characters or less."),

    capacity: RequiredNumberSchema
        .gt(0, "Capacity must be greater than 0"),

    screenType: ScreenTypeEnum,
});