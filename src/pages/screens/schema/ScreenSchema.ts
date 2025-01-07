import {z, ZodType} from "zod";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import {IDString, RequiredString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {ScreenTypeEnum} from "@/pages/screens/schema/ScreenTypeEnum.ts";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";

export const ScreenSchema: ZodType<IScreen> = z.object({
    _id: IDString,

    name: RequiredString
        .min(1, "Required.")
        .max(255, "Name must be 255 characters or less."),

    capacity: RequiredNumber
        .gt(0, "Capacity must be greater than 0"),

    screenType: ScreenTypeEnum,

    theatre: z
        .union([IDString, z.lazy(() => TheatreSchema)]),

    seats: z
        .array(z.union([IDString, z.lazy(() => SeatSchema)])),
});

export const ScreenArraySchema = z.array(ScreenSchema);

export type Screen = z.infer<typeof ScreenSchema>;
export type ScreenArray = z.infer<typeof ScreenArraySchema>;