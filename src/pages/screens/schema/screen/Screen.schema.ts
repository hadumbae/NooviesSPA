import {z, ZodType} from "zod";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";
import {ShowingSchema} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import {ScreenTypeEnum} from "@/pages/screens/schema/ScreenType.enum.ts";
import {IScreenDetails} from "@/pages/screens/interfaces/IScreenDetails.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import {ShowingPopulatedSchema} from "@/pages/showings/schema/populated/ShowingPopulatedSchema.ts";

/**
 * Base Zod schema for a Screen — core properties only.
 */
export const ScreenBaseSchema = z.object({
    _id: IDStringSchema,
    name: NonEmptyStringSchema.min(1, "Required.").max(255, "Name must be 255 characters or less."),
    capacity: RequiredNumberSchema.gt(0, "Capacity must be greater than 0"),
    screenType: ScreenTypeEnum,
});

/**
 * Zod schema for screens when theatre may be embedded or referenced,
 * and seats/showings may be optional.
 */
export const ScreenRawSchema = ScreenBaseSchema.extend({
    theatre: z.union([IDStringSchema, z.lazy(() => TheatreSchema)]),
    seats: z.array(z.lazy(() => SeatSchema)).optional(),
    showings: z.array(z.lazy(() => ShowingSchema)).optional(),
});

/**
 * Zod schema for fully detailed screens.
 * Theatre, seats, and showings are all required and fully populated.
 */
export const ScreenDetailsRawSchema = ScreenBaseSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    seats: z.array(z.lazy(() => SeatSchema)),
    showings: z.array(z.lazy(() => ShowingPopulatedSchema)),
});

/**
 * Zod schema + TS type for minimal Screen (no relationships).
 */
export const ScreenSchema = ScreenRawSchema as ZodType<IScreen>;

/**
 * Zod schema validating an array of basic screens.
 * Useful for endpoints returning multiple screens.
 */
export const ScreenArraySchema = z.array(ScreenSchema);

/**
 * Zod schema + TS type for Screen with full details.
 * Includes theatre, seats, and showings.
 */
export const ScreenDetailsSchema = ScreenDetailsRawSchema as ZodType<IScreenDetails>;

/**
 * Zod schema for validating a paginated response of screens.
 *
 * This schema defines the structure of paginated screen data received
 * from an API. It includes the total number of items and the list of screens
 * on the current page.
 */
export const PaginatedScreenSchema = generatePaginationSchema(ScreenSchema);