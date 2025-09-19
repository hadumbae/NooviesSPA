import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/NonEmptyStringSchema.ts";
import { SeatTypeEnum } from "@/pages/seats/schema/SeatType.enum.ts";
import { RequiredBoolean } from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import { RequiredNumberSchema } from "@/common/schema/numbers/RequiredNumberSchema.ts";
import { TheatreSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import { ScreenSchema } from "@/pages/screens/schema/screen/Screen.schema.ts";
import { generatePaginationSchema } from "@/common/schema/helpers/zodHelperFunctions.ts";
import { PositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/**
 * Schema representing a seat with minimal references.
 *
 * Theatre and screen are represented by their IDs only.
 * Fields:
 * - `_id`: Unique seat identifier
 * - `theatre`: Theatre ID
 * - `screen`: Screen ID
 * - `row`: Row identifier (non-empty, max 10 chars)
 * - `seatNumber`: Positive seat number
 * - `seatLabel`: Optional label
 * - `seatType`: Seat type enum
 * - `x`, `y`: Positive coordinates
 * - `isAvailable`: Boolean for availability
 * - `priceMultiplier`: Non-negative number for price adjustments
 */
export const SeatSchema = z.object({
    _id: IDStringSchema,
    theatre: IDStringSchema,
    screen: IDStringSchema,
    row: NonEmptyStringSchema.max(10, "Must be 10 characters or less."),
    seatNumber: PositiveNumberSchema,
    seatLabel: NonEmptyStringSchema.optional(),
    seatType: SeatTypeEnum,
    x: PositiveNumberSchema,
    y: PositiveNumberSchema,
    isAvailable: RequiredBoolean,
    priceMultiplier: RequiredNumberSchema.gte(0, "Must be 0 or greater."),
});

/**
 * Schema representing a seat with fully populated theatre and screen objects.
 *
 * Extends `SeatSchema` by overriding `theatre` and `screen` with nested objects.
 * Typically used for detailed seat responses.
 */
export const SeatDetailsSchema = SeatSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
    screen: z.lazy(() => ScreenSchema),
});

/**
 * Schema representing an array of minimal seat objects (`SeatSchema`).
 */
export const SeatArraySchema = z.array(SeatSchema);

/**
 * Schema representing a paginated response of minimal seats (`SeatSchema`).
 */
export const PaginatedSeatSchema = generatePaginationSchema(SeatSchema);

/**
 * Schema representing a paginated response of detailed seats (`SeatDetailsSchema`).
 *
 * Each item includes fully populated theatre and screen objects.
 */
export const PaginatedSeatDetailsSchema = generatePaginationSchema(SeatDetailsSchema);
