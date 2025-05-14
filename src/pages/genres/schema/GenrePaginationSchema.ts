import {z} from "zod";
import {GenreSchema} from "@/pages/genres/schema/GenreSchema.ts";
import {TotalItemsNumberSchema} from "@/common/schema/numbers/TotalItemsNumberSchema.ts";

export const PaginatedGenresSchema = z.object({
    totalItems: TotalItemsNumberSchema,
    items: z.array(z.lazy(() => GenreSchema)),
});

export type PaginatedGenres = z.infer<typeof PaginatedGenresSchema>;