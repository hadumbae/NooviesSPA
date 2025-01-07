import {z} from "zod";
import {TotalItemsNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {SeatSchema} from "@/pages/seats/schema/SeatSchema.ts";

export const PaginatedSeatSchema = z.object({
    totalItems: TotalItemsNumber,
    items: z.array(z.lazy(() => SeatSchema)),
});

export type PaginatedSeats = z.infer<typeof PaginatedSeatSchema>;