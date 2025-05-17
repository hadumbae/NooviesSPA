import {z} from "zod";
import RoleTypeConstant from "@/pages/moviecredit/constants/RoleTypeConstant.ts";

export const RoleTypeEnumSchema = z.enum(RoleTypeConstant, {message: "Invalid Role Type"});
export type RoleType = z.infer<typeof RoleTypeEnumSchema>;