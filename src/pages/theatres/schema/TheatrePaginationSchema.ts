import {z} from "zod";
import {TheatreSchema} from "@/pages/theatres/schema/TheatreSchema.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";

export const PaginatedTheatreSchema = generatePaginationSchema(TheatreSchema);
export type PaginatedTheatres = z.infer<typeof PaginatedTheatreSchema>;

