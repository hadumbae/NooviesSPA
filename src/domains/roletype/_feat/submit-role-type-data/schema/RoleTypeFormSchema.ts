/**
 * @fileoverview Zod schemas for validating role type form data and defining form types.
 *
 */

import {z} from "zod";
import {RoleTypeDepartmentSchema} from "@/domains/roletype/schema/fields/RoleTypeDepartmentSchema.ts";
import {
    RoleTypeCastCategorySchema,
    RoleTypeCrewCategorySchema,
} from "@/domains/roletype/schema/fields/RoleTypeCategorySchema.ts";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {AnyValues} from "@/common/types";
import {RoleTypeDescriptionSchema, RoleTypeNameSchema} from "@/domains/roletype/schema";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/** Base validation schema containing shared fields for all role type forms. */
const RoleTypeFormBaseSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    roleName: RoleTypeNameSchema,
    department: preprocessEmptyStringToUndefined(RoleTypeDepartmentSchema),
    description: preprocessEmptyStringToUndefined(RoleTypeDescriptionSchema).optional(),
});

/** Validation schema specifically for crew role form submissions. */
const RoleTypeFormCrewSchema = RoleTypeFormBaseSchema.extend({
    department: z.literal("CREW"),
    category: RoleTypeCrewCategorySchema,
});

/** Validation schema specifically for cast role form submissions. */
const RoleTypeFormCastSchema = RoleTypeFormBaseSchema.extend({
    department: z.literal("CAST"),
    category: RoleTypeCastCategorySchema,
});

/** Discriminated union schema for validating role type form submissions based on the department field. */
export const RoleTypeFormSchema = z.discriminatedUnion("department", [
    RoleTypeFormCrewSchema,
    RoleTypeFormCastSchema,
]);

/** Represents the fully validated data for a role type submission. */
export type RoleTypeFormData = z.infer<typeof RoleTypeFormSchema>;

/** Type representing the raw form values for a role type based on the model schema. */
export type RoleTypeFormValues = AnyValues<RoleTypeFormData>;
