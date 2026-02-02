/**
 * @file ReserveTicketFormValuesSchema.ts
 *
 * @summary
 * Zod schema for initial and in-progress ticket reservation form values.
 *
 * @description
 * Defines a permissive schema used by the client UI to represent
 * reservation form state prior to validation.
 *
 * Unlike submission schemas, these values:
 * - May be incomplete or empty
 * - Are not guaranteed to be type-safe or domain-valid
 * - Exist solely to support form initialization and state management
 */

import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * Base form-state schema for ticket reservation workflows.
 *
 * @remarks
 * Each field uses {@link FormStarterValueSchema} to allow
 * empty, partial, or placeholder values during user interaction.
 */
export const ReserveTicketFormValuesSchema = z.object({
    showing: FormStarterValueSchema,
    ticketCount: FormStarterValueSchema,
    currency: FormStarterValueSchema,
    reservationType: FormStarterValueSchema,
    selectedSeating: FormStarterValueSchema,
});

/**
 * Strongly typed representation of reservation form values.
 *
 * @remarks
 * Inferred directly from {@link ReserveTicketFormValuesSchema}.
 * Intended for client-side form state only.
 */
export type ReserveTicketFormValues =
    z.infer<typeof ReserveTicketFormValuesSchema>;
