import {z} from "zod";
import CountryConstant from "@/common/constants/CountryConstant.ts";

export const CountryEnum = z.enum(CountryConstant, {message: "Invalid Country."});
export type Country = z.infer<typeof CountryEnum>;