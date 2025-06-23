import {z} from "zod";
import ScreenTypeConstant from "@/pages/screens/constants/ScreenTypeConstant.ts";

export const ScreenTypeEnum = z
    .enum(
        ScreenTypeConstant,
        {message: "Invalid Screen Type."},
    );

export type ScreenType = z.infer<typeof ScreenTypeEnum>;