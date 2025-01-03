import {z} from "zod";
import {TotalItemsNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";

export const PaginatedGenresSchema = z.object({
    totalItems: TotalItemsNumber,
    items: z.array(z.lazy(() => GenreSchema)),
});

export type PaginatedGenres = z.infer<typeof PaginatedGenresSchema>;