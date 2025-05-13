import {z, ZodType} from "zod";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {ScreenBaseSchema} from "@/pages/screens/schema/base/ScreenBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

export const ScreenWithShowingsSchema: ZodType<IScreen> = ScreenBaseSchema.extend({
    theatre: z.union([IDStringSchema, z.lazy(() => TheatreSchema)]),
    seats: z.array(z.union([IDStringSchema, z.lazy(() => SeatSchema)])),
    showings: z.array(z.lazy(() => ShowingSchema)),
});

export type ScreenWithShowings = z.infer<typeof ScreenWithShowingsSchema>;
