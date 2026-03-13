import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

export const AuthUserAdminStatusSchema = z.object({
    userID: IDStringSchema,
    isAdmin: CoercedBooleanValueSchema,
});

export type AuthUserAdminStatus = z.infer<typeof AuthUserAdminStatusSchema>;