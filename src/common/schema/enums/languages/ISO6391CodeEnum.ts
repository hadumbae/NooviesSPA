import {z} from "zod";
import ISO6391CodeConstant from "@/common/constants/languages/ISO6391CodeConstant.ts";

export const ISO6391CodeEnum = z.enum(
    ISO6391CodeConstant,
    {message: "Invalid Language"},
);

export type ISO6391Code = z.infer<typeof ISO6391CodeEnum>;