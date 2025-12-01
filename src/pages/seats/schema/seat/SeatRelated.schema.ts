import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";
import { SeatDetailsSchema } from "@/pages/seats/schema/seat/SeatDetails.schema.ts";
import { z } from "zod";
import { SeatSchema } from "@/pages/seats/schema/seat/Seat.schema.ts";

/**
 * ## SeatArraySchema
 *
 * Zod schema representing an array of minimal seat objects validated by {@link SeatSchema}.
 *
 * @remarks
 * Useful for endpoints or functions that return multiple seats without fully populated references.
 */
export const SeatArraySchema = z.array(SeatSchema);

/**
 * ## SeatDetailsArraySchema
 *
 * Zod schema representing an array of detailed seat objects validated by {@link SeatDetailsSchema}.
 *
 * @remarks
 * Each seat includes fully populated theatre and screen objects.
 */
export const SeatDetailsArraySchema = z.array(SeatDetailsSchema);

/**
 * ## PaginatedSeatSchema
 *
 * Schema representing a paginated response of minimal seats (`SeatSchema`).
 *
 * @remarks
 * Generated using {@link generatePaginationSchema} for consistent pagination structure.
 */
export const PaginatedSeatSchema = generatePaginationSchema(SeatSchema);

/**
 * ## PaginatedSeatDetailsSchema
 *
 * Schema representing a paginated response of detailed seats (`SeatDetailsSchema`).
 *
 * @remarks
 * Each item in the paginated response includes fully populated theatre and screen objects.
 * Also uses {@link generatePaginationSchema} for consistent pagination structure.
 */
export const PaginatedSeatDetailsSchema = generatePaginationSchema(SeatDetailsSchema);
