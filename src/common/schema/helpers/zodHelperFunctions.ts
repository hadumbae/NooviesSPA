import {z, ZodType} from "zod";

import {TotalItemsNumberSchema} from "@/common/schema/numbers/TotalItemsNumberSchema.ts";

export const generatePaginationSchema = <TSchema>(schema: ZodType<TSchema>) => z.object({
    totalItems: TotalItemsNumberSchema,
    items: z.array(z.lazy(() => schema))
});