import {z} from "zod";
import {TotalItemsNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {ScreenSchema} from "@/pages/screens/schema/ScreenSchema.ts";

export const PaginatedScreenSchema = z.object({
    totalItems: TotalItemsNumber,
    items: z.array(z.lazy(() => ScreenSchema)),
});

export type PaginatedScreens = z.infer<typeof PaginatedScreenSchema>;