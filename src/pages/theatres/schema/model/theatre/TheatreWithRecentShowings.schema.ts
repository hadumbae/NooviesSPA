/**
 * @file TheatreWithRecentShowings.schema.ts
 *
 * Zod schemas for theatres augmented with recent showings,
 * including a paginated result wrapper.
 *
 * Used in browse and search endpoints where theatres are returned
 * with a limited, pre-populated set of showings.
 */

import {TheatreSchema} from "@/pages/theatres/schema/model/theatre/Theatre.schema.ts";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {ShowingDetailsArraySchema} from "@/pages/showings/schema/showing/ShowingRelated.schema.ts";

/**
 * Theatre schema extended with populated showing details.
 */
export const TheatreWithRecentShowingsSchema = TheatreSchema.extend({
    /** Recent or filtered showings associated with the theatre */
    showings: ShowingDetailsArraySchema,
});

/**
 * Paginated wrapper schema for {@link TheatreWithRecentShowingsSchema}.
 */
export const PaginatedTheatresWithRecentShowingsSchema =
    generatePaginationSchema(TheatreWithRecentShowingsSchema);
