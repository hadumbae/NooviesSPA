import {z} from "zod";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

export const AuthUserAdminStatusSchema = z.object({
    userID: IDStringSchema,
    isAdmin: RequiredBoolean,
});

export type AuthUserAdminStatus = z.infer<typeof AuthUserAdminStatusSchema>;