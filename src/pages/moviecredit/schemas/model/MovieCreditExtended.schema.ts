import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";
import generateArraySchema from "@/common/utility/validation/generateArraySchema.ts";
import {MovieCreditDetailsSchema, MovieCreditSchema} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";

/** Paginated list of movie credits */
export const PaginatedMovieCreditSchema = generatePaginationSchema(MovieCreditSchema);

/** Array of movie credits */
export const MovieCreditArraySchema = generateArraySchema(MovieCreditSchema);

/** Paginated detailed movie credits */
export const PaginatedMovieCreditDetailsSchema = generatePaginationSchema(MovieCreditDetailsSchema);

/** Array of detailed movie credits */
export const MovieCreditDetailsArraySchema = generateArraySchema(MovieCreditDetailsSchema);