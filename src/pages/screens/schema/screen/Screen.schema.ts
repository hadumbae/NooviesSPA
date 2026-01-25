import { z } from "zod";
import { TheatreSchema } from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { CoercedNumberValueSchema } from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import { ScreenTypeEnum } from "@/pages/screens/schema/ScreenType.enum.ts";
import { NonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";

/**
 * @file Screen.schema.ts
 *
 * Zod schemas for validating **screen** domain objects.
 *
 * Screens represent individual auditoriums within a theatre.
 */
export const ScreenSchema = z.object({
    /** MongoDB ObjectId (readonly). */
    _id: IDStringSchema.readonly(),

    /** Screen display name (≤ 255 characters). */
    name: NonEmptyStringSchema
        .min(1, "Required.")
        .max(255, "Name must be 255 characters or less."),

    /** Maximum seating capacity (> 0). */
    capacity: CoercedNumberValueSchema.gt(
        0,
        "Capacity must be greater than 0",
    ),

    /** Screen classification (e.g., IMAX, STANDARD, 3D). */
    screenType: ScreenTypeEnum,

    /** Reference to owning theatre (ObjectId string). */
    theatre: IDStringSchema,

    /** URL-safe unique identifier (readonly). */
    slug: NonEmptyStringSchema.readonly(),
});

/**
 * Screen schema with populated theatre reference.
 */
export const PopulatedScreenSchema = ScreenSchema.extend({
    /** Fully populated theatre object. */
    theatre: z.lazy(() => TheatreSchema),
});

/**
 * Screen schema extended with derived metrics.
 */
export const ScreenDetailsSchema = PopulatedScreenSchema.extend({
    /** Total number of seats in this screen. */
    seatCount: NonNegativeNumberSchema,

    /** Count of upcoming showings. */
    futureShowingCount: NonNegativeNumberSchema,
});

/** Array response of base screens. */
export const ScreenArraySchema = z.array(ScreenSchema);

/** Paginated response of base screen entries. */
export const PaginatedScreenSchema =
    generatePaginationSchema(ScreenSchema);

/** Paginated response of detailed screen entries. */
export const PaginatedScreenDetailsSchema =
    generatePaginationSchema(ScreenDetailsSchema);
