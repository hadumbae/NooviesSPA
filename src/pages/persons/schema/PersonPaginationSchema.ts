import {z} from "zod";
import {TotalItemsNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";

export const PaginatedPersonsSchema = z.object({
    totalItems: TotalItemsNumber,
    items: z.array(z.lazy(() => PersonSchema)),
});

export type PaginatedPersons = z.infer<typeof PaginatedPersonsSchema>;
