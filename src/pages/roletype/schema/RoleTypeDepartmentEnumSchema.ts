import {z} from "zod";
import RoleTypeDepartmentConstant from "@/pages/roletype/constant/RoleTypeDepartmentConstant.ts";

/**
 * Zod schema representing the valid role type departments.
 *
 * This schema validates that a given value is one of the allowed role type
 * department constants (e.g., `"CAST"` or `"CREW"`).
 *
 * @example
 * ```ts
 * RoleTypeDepartmentEnumSchema.parse("CAST"); // ✅ valid
 * RoleTypeDepartmentEnumSchema.parse("CREW"); // ✅ valid
 * RoleTypeDepartmentEnumSchema.parse("ADMIN"); // ❌ throws ZodError
 * ```
 */
export const RoleTypeDepartmentEnumSchema = z.enum(
    RoleTypeDepartmentConstant,
    {
        required_error: "Required.",
        message: "Invalid value. Must be `CAST` or `CREW`.",
        invalid_type_error: "Must be a valid `Department` string."
    },
);

/**
 * TypeScript type inferred from {@link RoleTypeDepartmentEnumSchema}.
 *
 * Represents a union of valid role type department values.
 *
 * @example
 * ```ts
 * const department: RoleTypeDepartment = "CAST"; // ✅
 * const department: RoleTypeDepartment = "CREW"; // ✅
 * const department: RoleTypeDepartment = "ADMIN"; // ❌ Type error
 * ```
 */
export type RoleTypeDepartment = z.infer<typeof RoleTypeDepartmentEnumSchema>;
