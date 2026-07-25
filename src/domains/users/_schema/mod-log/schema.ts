import {z} from "zod";
import {UserSchema} from "@/domains/users";
import {UserModerationLogReferenceSchema} from "@/domains/users/_schema/mod-log/refSchema.ts";

export const UserModerationLogSchema = UserModerationLogReferenceSchema.omit({admin: true, user: true}).merge(z.object({
    user: UserSchema,
    admin: UserSchema,
}));

export type UserModerationLog = z.infer<typeof UserModerationLogSchema>;