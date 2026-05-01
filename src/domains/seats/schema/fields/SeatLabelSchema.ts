import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {z} from "zod";

export const SeatLabelSchema = NonEmptyStringSchema.max(25, "Must be 25 characters or less.");
export type SeatLabel = z.infer<typeof SeatLabelSchema>;