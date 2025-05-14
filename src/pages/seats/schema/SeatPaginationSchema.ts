import {z} from "zod";
import {SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";
import {TotalItemsNumberSchema} from "@/common/schema/numbers/TotalItemsNumberSchema.ts";

export const PaginatedSeatSchema = z.object({
    totalItems: TotalItemsNumberSchema,
    items: z.array(z.lazy(() => SeatSchema)),
});

export type PaginatedSeats = z.infer<typeof PaginatedSeatSchema>;