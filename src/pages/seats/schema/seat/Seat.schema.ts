import {z, ZodType} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {SeatTypeEnum} from "@/pages/seats/schema/SeatType.enum.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {RequiredNumberSchema} from "@/common/schema/numbers/RequiredNumberSchema.ts";
import {TheatreSchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import {ScreenSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import ISeat from "@/pages/seats/interfaces/ISeat.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import ISeatDetails from "@/pages/seats/interfaces/ISeatDetails.ts";

/**
 * Schema representing the base structure of a seat.
 * Used in multiple forms such as raw, details, and pagination.
 */
export const SeatBaseSchema = z.object({
    /**
     * Unique identifier for the seat.
     */
    _id: IDStringSchema,

    /**
     * The row label of the seat (e.g., "A", "B", etc.).
     */
    row: NonEmptyStringSchema.min(1, "Required.").max(50, "Must be 50 characters or less."),

    /**
     * The seat number within the row.
     */
    seatNumber: NonEmptyStringSchema.min(1, "Required.").max(50, "Must be 50 characters or less."),

    /**
     * Enum value indicating the type of the seat.
     */
    seatType: SeatTypeEnum,

    /**
     * Whether the seat is currently available.
     */
    isAvailable: RequiredBoolean,

    /**
     * Multiplier applied to the base price, based on seat type or location.
     * Must be zero or greater.
     */
    priceMultiplier: RequiredNumberSchema.gte(0, "Must be 0 or greater."),
});

/**
 * Extended schema for a seat that includes either ID references
 * or embedded theatre and screen objects.
 */
export const SeatRawSchema = SeatBaseSchema.extend({
    /**
     * Reference to the theatre this seat belongs to.
     * Can be either an ID or a full theatre object.
     */
    theatre: z.union([IDStringSchema, z.lazy(() => TheatreSchema)]),

    /**
     * Reference to the screen this seat is located in.
     * Can be either an ID or a full screen object.
     */
    screen: z.union([IDStringSchema, z.lazy(() => ScreenSchema)]),
});

/**
 * Extended schema where theatre and screen must be fully populated objects.
 * Used for detailed seat views.
 */
export const SeatDetailsRawSchema = SeatBaseSchema.extend({
    /**
     * Full theatre object this seat belongs to.
     */
    theatre: z.lazy(() => TheatreSchema),

    /**
     * Full screen object this seat is located in.
     */
    screen: z.lazy(() => ScreenSchema),
});

/**
 * Zod schema typed with ISeat interface.
 * Used for type-safe parsing and validation of basic seat data.
 */
export const SeatSchema = SeatRawSchema as ZodType<ISeat>;

/**
 * Zod schema typed with ISeatDetails interface.
 * Used for detailed seat views where theatre and screen are populated.
 */
export const SeatDetailsSchema = SeatDetailsRawSchema as ZodType<ISeatDetails>;

/**
 * Schema for an array of seats.
 */
export const SeatArraySchema = z.array(SeatSchema);

/**
 * Schema for a paginated response of seats.
 */
export const PaginatedSeatSchema = generatePaginationSchema(SeatSchema);

export const PaginatedSeatDetailsSchema = generatePaginationSchema(SeatDetailsSchema);