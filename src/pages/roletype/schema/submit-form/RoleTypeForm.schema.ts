import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";

/**
 * Zod schema for the initial form values when creating or editing a role type.
 *
 * This schema is typically used for UI form state, where all fields may start
 * as "empty" values rather than fully validated ones.
 *
 * Fields:
 * - `roleName`: Starter value for the role name field.
 * - `department`: Starter value for the department field.
 * - `description`: Starter value for the description field.
 *
 * @remarks
 * `FormStarterValueSchema` usually represents an "empty" form state,
 * such as `""`, `null`, or `undefined`, before final validation.
 *
 * @example
 * ```ts
 * const starterValues = RoleTypeFormValuesSchema.parse({
 *   roleName: "",
 *   department: "",
 *   description: ""
 * });
 * ```
 */
export const RoleTypeFormValuesSchema = z.object({
    /** Starter value for the role name field. */
    roleName: FormStarterValueSchema,

    /** Starter value for the department field. */
    department: FormStarterValueSchema,

    /** Starter value for the description field. */
    description: FormStarterValueSchema,
});

/**
 * Zod schema for validated role type form submission.
 *
 * This schema enforces correct types and constraints for form values
 * after user input, ensuring they match the requirements for a `RoleType`.
 *
 * Fields:
 * - `roleName`: Required string, max length 150.
 * - `department`: Must be a valid department enum (`"CAST"` or `"CREW"`).
 * - `description`: Optional string, max length 1000. Transformed to
 *   `undefined` if empty or not a string.
 *
 * @example
 * ```ts
 * const formData = RoleTypeFormSchema.parse({
 *   roleName: "Actor",
 *   department: "CAST",
 *   description: "Performs a character in the production."
 * });
 *
 * // ✅ Valid, parsed into strongly typed data
 * ```
 *
 * @example
 * ```ts
 * RoleTypeFormSchema.parse({
 *   roleName: "This is way too long ...", // > 150 chars
 *   department: "ADMIN", // ❌ not allowed
 *   description: null
 * });
 * // Throws ZodError with descriptive validation messages
 * ```
 */
export const RoleTypeFormSchema = z.object({
    /**
     * Role name, required, must be a non-empty string.
     *
     * - Maximum length: 150 characters.
     * - Error message if too long: `"Must be 150 characters or less."`
     */
    roleName: NonEmptyStringSchema
        .max(150, {message: "Must be 150 characters or less."}),

    /**
     * Department value, required.
     *
     * - Must be `"CAST"` or `"CREW"`.
     * - Empty string (`""`) is not allowed at validation time.
     */
    department: z
        .union([z.literal(""), RoleTypeDepartmentEnumSchema], {message: "Invalid value. Must be a string."})
        .refine(val => val !== "", {message: "Required."}),

    /**
     * Optional description field.
     *
     * - Must be a string (if provided).
     * - Maximum length: 1000 characters.
     * - Empty string or non-string values are transformed to `undefined`.
     */
    description: z
        .string({required_error: "Required.", invalid_type_error: "Must be a string."})
        .max(1000, {message: "Must be 1000 characters or less."})
        .optional()
        .transform((val) => {
            if (typeof val !== "string" || val === "") return undefined;
            return val;
        }),
});