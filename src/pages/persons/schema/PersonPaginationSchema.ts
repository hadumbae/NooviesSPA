import {z} from "zod";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";
import {TotalItemsNumberSchema} from "@/common/schema/numbers/TotalItemsNumberSchema.ts";

export const PaginatedPersonsSchema = z.object({
    totalItems: TotalItemsNumberSchema,
    items: z.array(z.lazy(() => PersonSchema)),
});

export type PaginatedPersons = z.infer<typeof PaginatedPersonsSchema>;
