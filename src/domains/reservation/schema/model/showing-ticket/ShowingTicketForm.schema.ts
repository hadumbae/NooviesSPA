import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CleanedNonNegativeNumberSchema}
    from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import generateFormValueSchema
    from "@/common/utility/schemas/generateFormValueSchema.ts";

/**
 * @file ShowingTicketForm.schema.ts
 *
 * Zod schemas for validating ticket selection inputs
 * during the reservation flow.
 */

/**
 * Core ticket selection schema for a showing.
 *
 * @remarks
 * - Ticket quantities must be zero or greater.
 * - `seats` is optional to support general admission
 *   or pre-seat-selection flows.
 */
export const ShowingTicketFormSchema = z.object({
    /** Target showing identifier */
    showingID: IDStringSchema,

    /** Number of adult tickets */
    adultTickets: CleanedNonNegativeNumberSchema,

    /** Number of minor tickets */
    minorTickets: CleanedNonNegativeNumberSchema,

    /** Number of senior tickets */
    seniorTickets: CleanedNonNegativeNumberSchema,

    /**
     * Selected seat map identifiers.
     *
     * Optional to allow flows where seats
     * are assigned later or not required.
     */
    seats: z
        .array(IDStringSchema, {message: "Must be an array of SeatMap IDs."})
        .optional(),
});

/**
 * Form-state schema derived from {@link ShowingTicketFormSchema}.
 *
 * @remarks
 * Wraps each field in a form-friendly `{ value, touched }`
 * structure for controlled UI state management.
 */
export const ShowingTicketFormValuesSchema =
    generateFormValueSchema(ShowingTicketFormSchema);
