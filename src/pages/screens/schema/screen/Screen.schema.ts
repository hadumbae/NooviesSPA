import { z } from "zod";
import { TheatreSchema } from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import { IDStringSchema } from "@/common/schema/strings/IDStringSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/NonEmptyStringSchema.ts";
import { RequiredNumberSchema } from "@/common/schema/numbers/RequiredNumberSchema.ts";
import { ScreenTypeEnum } from "@/pages/screens/schema/ScreenType.enum.ts";
import { generatePaginationSchema } from "@/common/schema/helpers/zodHelperFunctions.ts";
import { NonNegativeNumberSchema } from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Schema for a basic screen object.
 */
export const ScreenSchema = z.object({
    /** Unique identifier for the screen */
    _id: IDStringSchema.readonly(),

    /** Name of the screen */
    name: NonEmptyStringSchema
        .min(1, "Required.")
        .max(255, "Name must be 255 characters or less."),

    /** Maximum number of people the screen can accommodate */
    capacity: RequiredNumberSchema.gt(0, "Capacity must be greater than 0"),

    /** Type of screen (e.g., IMAX, Standard, 3D) */
    screenType: ScreenTypeEnum,

    /** Reference ID of the theatre this screen belongs to */
    theatre: IDStringSchema,
});

/**
 * Schema for a screen with additional details.
 */
export const ScreenDetailsSchema = ScreenSchema.extend({
    /** Detailed theatre information */
    theatre: z.lazy(() => TheatreSchema),

    /** Total number of seats in the screen */
    seatCount: NonNegativeNumberSchema,

    /** Number of showings scheduled in the future */
    futureShowingCount: NonNegativeNumberSchema,
});

/** Array of basic screens */
export const ScreenArraySchema = z.array(ScreenSchema);

/** Paginated response of basic screens */
export const PaginatedScreenSchema = generatePaginationSchema(ScreenSchema);

/** Paginated response of detailed screens */
export const PaginatedScreenDetailsSchema = generatePaginationSchema(ScreenDetailsSchema);
