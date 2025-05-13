import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * A Zod schema designed for use with form libraries like React Hook Form,
 * where the value of a select input may be initially `undefined`.
 *
 * @remarks
 * - Accepts `undefined` at first (e.g., before user makes a selection)
 * - Enforces that a valid 24-character string must be selected before submission
 * - Allows clear, user-friendly error messaging without immediate form breakage
 *
 * @useCase
 * - Ideal for `<select>` fields in React Hook Form that return `undefined` when unselected
 * - Prevents early validation errors from being thrown on initial render
 *
 * @example
 * ```ts
 * RefinedIDString.parse(undefined); // ❌ Throws "Required."
 * RefinedIDString.parse("507f1f77bcf86cd799439011"); // ✅ Valid
 * ```
 *
 * @see {@link IDStringSchema} for the core ID format validation
 */
export const RefinedIDStringSchema = z
    .union([z.undefined(), IDStringSchema])
    .refine((id) => !!id, {message: "Required."});