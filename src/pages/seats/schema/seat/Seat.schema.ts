import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatType.enum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import {TheatreSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Base schema representing a seat without theatre or screen references.
 * Includes properties such as row, seat number, label, type, position, availability, and price multiplier.
 */
export const SeatBaseSchema = z.object({
    _id: IDStringSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    seatNumber: NonNegativeNumberSchema,
    seatLabel: NonEmptyStringSchema.optional(),
    seatType: SeatTypeEnum,
    x: PositiveNumberSchema.optional(),
    y: PositiveNumberSchema.optional(),
    isAvailable: RequiredBoolean,
    priceMultiplier: RequiredNumberSchema.gte(0, "Must be 0 or greater."),
});

/**
 * Schema for a seat with theatre and screen represented as either IDs or full nested objects.
 * Used when you need flexible references (ID or populated object).
 */
export const SeatSchema = SeatBaseSchema.extend({
    theatre: z.union([IDStringSchema, z.lazy(() => TheatreSchema)]),
    screen: z.union([IDStringSchema, z.lazy(() => ScreenSchema)]),
});

/**
 * Schema for a seat with theatre and screen fully populated as nested objects.
 * Typically used for detailed seat responses.
 */
export const SeatDetailsSchema = SeatBaseSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => ScreenSchema),
});

/**
 * Schema representing an array of `SeatSchema` objects.
 */
export const SeatArraySchema = z.array(SeatSchema);

/**
 * Schema representing a paginated response of `SeatSchema` objects.
 */
export const PaginatedSeatSchema = generatePaginationSchema(SeatSchema);

/**
 * Schema representing a paginated response of `SeatDetailsSchema` objects.
 * Used when detailed seat information (with fully populated theatre and screen) is required.
 */
export const PaginatedSeatDetailsSchema = generatePaginationSchema(SeatDetailsSchema);