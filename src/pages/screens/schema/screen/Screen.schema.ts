import {z, ZodType} from "zod";
import {IScreen} from "@/pages/screens/interfaces/IScreen.ts";
import {TheatreSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import {ScreenTypeEnum} from "@/pages/screens/schema/ScreenType.enum.ts";
import {IScreenDetails} from "@/pages/screens/interfaces/IScreenDetails.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Base schema for a screen object.
 *
 * Contains fundamental screen fields: ID, name, capacity, and screen type.
 */
export const ScreenBaseSchema = z.object({
    /** Unique identifier for the screen */
    _id: IDStringSchema,

    /** Human-readable screen name, required and max 255 characters */
    name: NonEmptyStringSchema.min(1, "Required.").max(255, "Name must be 255 characters or less."),

    /** Total seating capacity; must be greater than 0 */
    capacity: RequiredNumberSchema.gt(0, "Capacity must be greater than 0"),

    /** Enum representing the type of screen (e.g., standard, IMAX, 3D) */
    screenType: ScreenTypeEnum,
});

/**
 * Schema for a screen object including its theatre reference.
 *
 * Theatre may be represented as an ID or a full theatre object.
 */
export const ScreenRawSchema = ScreenBaseSchema.extend({
    /** Reference to the theatre the screen belongs to */
    theatre: z.union([IDStringSchema, z.lazy(() => TheatreSchema)]),
});

/**
 * Schema for a detailed screen object including enriched data.
 *
 * This includes the fully populated theatre, seat count, and number of upcoming showings.
 */
export const ScreenDetailsRawSchema = ScreenBaseSchema.extend({
    /** Fully populated theatre object */
    theatre: z.lazy(() => TheatreSchema),

    /** Total number of seats in the screen */
    seatCount: NonNegativeNumberSchema,

    /** Number of future showings scheduled for the screen */
    futureShowingCount: NonNegativeNumberSchema,
});

/**
 * Zod schema for validating basic screen data (`IScreen`).
 */
export const ScreenSchema = ScreenRawSchema as ZodType<IScreen>;

/**
 * Zod schema for an array of screen objects.
 */
export const ScreenArraySchema = z.array(ScreenSchema);

/**
 * Zod schema for validating detailed screen data (`IScreenDetails`),
 * including populated theatre, seat count, and future showings.
 */
export const ScreenDetailsSchema = ScreenDetailsRawSchema as ZodType<IScreenDetails>;

/**
 * Paginated Zod schema for basic screen data.
 *
 * Includes pagination metadata (e.g., total count, page number)
 * and an array of `ScreenSchema` items representing individual screens.
 */
export const PaginatedScreenSchema = generatePaginationSchema(ScreenSchema);

/**
 * Paginated Zod schema for detailed screen data.
 *
 * Similar to `PaginatedScreenSchema` but uses `ScreenDetailsSchema` to include
 * richer information such as theatre, seat count, and future showing count.
 */
export const PaginatedScreenDetailsSchema = generatePaginationSchema(ScreenDetailsSchema);