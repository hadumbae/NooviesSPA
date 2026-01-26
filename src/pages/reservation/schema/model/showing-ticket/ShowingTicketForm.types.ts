import {z} from "zod";
import {
    ShowingTicketFormSchema,
    ShowingTicketFormValuesSchema,
} from "@/pages/reservation/schema/model/showing-ticket/ShowingTicketForm.schema.ts";

/**
 * Inferred payload type for ticket selection submission.
 */
export type ShowingTicketForm = z.infer<typeof ShowingTicketFormSchema>;

/**
 * Inferred form-state type for ticket selection UI.
 *
 * @remarks
 * Matches {@link ShowingTicketFormValuesSchema} and is
 * intended for client-side form handling.
 */
export type ShowingTicketFormValues = z.infer<typeof ShowingTicketFormValuesSchema>;
