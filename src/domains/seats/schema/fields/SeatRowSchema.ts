import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

export const SeatRowSchema = NonEmptyStringSchema.max(10, "Must be 10 characters or less.");
export type SeatRow = z.infer<typeof SeatRowSchema>;