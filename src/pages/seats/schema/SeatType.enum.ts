import {z} from "zod";
import SeatTypeConstant from "@/pages/seats/constants/SeatTypeConstant.ts";

export const SeatTypeEnum = z
    .enum(
        SeatTypeConstant,
        {
            message: "Invalid Seat Type.",
            required_error: "Required.",
            invalid_type_error: "Must be a valid seat type.",
            description: "The seat type of a seat."
        },
    );

export type SeatType = z.infer<typeof SeatTypeEnum>;