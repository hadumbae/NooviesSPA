import {z} from "zod";
import {RoleTypeFormSchema, RoleTypeFormValuesSchema} from "@/pages/roletype/schema/submit-form/RoleTypeForm.schema.ts";

/**
 * TypeScript type inferred from {@link RoleTypeFormValuesSchema}.
 *
 * Represents the unvalidated **starter values** for a role type form.
 * Typically used when initializing form state in the UI, where fields
 * may begin as empty values (e.g., `""`, `null`, or `undefined`).
 *
 * @example
 * ```ts
 * const initialValues: RoleTypeFormValues = {
 *   roleName: "",
 *   department: "",
 *   description: ""
 * };
 * ```
 */
export type RoleTypeFormValues = z.infer<typeof RoleTypeFormValuesSchema>;

/**
 * TypeScript type inferred from {@link RoleTypeFormSchema}.
 *
 * Represents the fully validated **form data** after parsing and
 * applying Zod’s validation rules. Ensures `roleName` and `department`
 * are valid and `description` (if provided) is properly constrained.
 *
 * @example
 * ```ts
 * const data: RoleTypeForm = {
 *   roleName: "Actor",
 *   department: "CAST",
 *   description: "Plays a character in the production."
 * };
 * ```
 *
 * @example
 * ```ts
 * // ❌ Compile-time error
 * const badData: RoleTypeForm = {
 *   roleName: "",
 *   department: "ADMIN", // not allowed
 *   description: null
 * };
 * ```
 */
export type RoleTypeForm = z.infer<typeof RoleTypeFormSchema>;