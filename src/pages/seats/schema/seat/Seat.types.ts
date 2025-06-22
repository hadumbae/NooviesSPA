import {z} from "zod";
import {PaginatedSeatSchema, SeatArraySchema, SeatSchema} from "@/pages/seats/schema/seat/Seat.schema.ts";

export type Seat = z.infer<typeof SeatSchema>;
export type SeatArray = z.infer<typeof SeatArraySchema>;
export type PaginatedSeats = z.infer<typeof PaginatedSeatSchema>;