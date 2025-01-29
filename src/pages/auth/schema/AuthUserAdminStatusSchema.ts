import {z} from "zod";
import {IDString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";

export const AuthUserAdminStatusSchema = z.object({
    userID: IDString,
    isAdmin: RequiredBoolean,
});

export type AuthUserAdminStatus = z.infer<typeof AuthUserAdminStatusSchema>;