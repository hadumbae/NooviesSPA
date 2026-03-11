import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {MovieCreditSchema} from "@/pages/moviecredit/schemas/model/movie-credit-schema/MovieCredit.schema.ts";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {
    MovieCreditDetailsSchema
} from "@/pages/moviecredit/schemas/model/movie-credit-details-schema/MovieCreditDetails.schema.ts";

/** Paginated list of movie credits */
export const PaginatedMovieCreditSchema = generatePaginationSchema(MovieCreditSchema);

/** Array of movie credits */
export const MovieCreditArraySchema = generateArraySchema(MovieCreditSchema);

/** Paginated detailed movie credits */
export const PaginatedMovieCreditDetailsSchema = generatePaginationSchema(MovieCreditDetailsSchema);

/** Array of detailed movie credits */
export const MovieCreditDetailsArraySchema = generateArraySchema(MovieCreditDetailsSchema);