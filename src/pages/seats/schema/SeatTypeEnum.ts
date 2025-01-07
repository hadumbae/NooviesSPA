import {z} from "zod";
import SeatTypeConstant from "@/pages/seats/constants/SeatTypeConstant.ts";

export const SeatTypeEnum = z
    .enum(
        SeatTypeConstant,
        {message: "Invalid Seat Type."},
    );

export type SeatType = z.infer<typeof SeatTypeEnum>;