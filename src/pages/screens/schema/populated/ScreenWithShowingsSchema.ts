import {z, ZodType} from "zod";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import {IDString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {ScreenBaseSchema} from "@/pages/screens/schema/base/ScreenBaseSchema.ts";

export const ScreenWithShowingsSchema: ZodType<IScreen> = ScreenBaseSchema.extend({
    theatre: z.union([IDString, z.lazy(() => TheatreSchema)]),
    seats: z.array(z.union([IDString, z.lazy(() => SeatSchema)])),
    showings: z.array(z.lazy(() => ShowingSchema)),
});

export type ScreenWithShowings = z.infer<typeof ScreenWithShowingsSchema>;
