import {z, ZodType} from "zod";
import {TotalItemsNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";

export const generatePaginationSchema = <TSchema>(schema: ZodType<TSchema>) => z.object({
    totalItems: TotalItemsNumber,
    items: z.array(z.lazy(() => schema))
});