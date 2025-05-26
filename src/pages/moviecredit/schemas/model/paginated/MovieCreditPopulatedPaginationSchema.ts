import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import {MovieCreditPopulatedSchema} from "@/pages/moviecredit/schemas/model/populated/MovieCreditPopulatedSchema.ts";
import {z} from "zod";

/**
 * Schema for paginated movie credits with populated fields.
 *
 * This schema extends the `MovieCreditPopulatedSchema` by adding pagination-related fields,
 * such as `page`, `limit`, and `totalCount`. It's useful for validating and typing paginated
 * responses that include detailed movie credit information.
 */
export const MovieCreditPopulatedPaginationSchema = generatePaginationSchema(MovieCreditPopulatedSchema);

/**
 * Type representing the structure of paginated movie credits with populated fields.
 *
 * This type is inferred from the `MovieCreditPopulatedPaginationSchema` and includes both
 * the pagination metadata and the array of populated movie credit entries.
 */
export type PopulatedMovieCreditPagination = z.infer<typeof MovieCreditPopulatedSchema>;