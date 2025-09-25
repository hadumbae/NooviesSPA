import {z} from "zod";
import {UserLoginSchema, UserRegisterSchema} from "@/pages/auth/schema/form/AuthForm.schema.ts";

/**
 * Strongly-typed data shape for the **user registration form**.
 *
 * Inferred directly from {@link UserRegisterSchema}, ensuring that
 * form data and schema validation remain perfectly in sync.
 *
 * Fields:
 * - `name`: string (3–255 chars)
 * - `email`: valid email string (≤ 255 chars)
 * - `password`: string (16–255 chars)
 * - `confirm`: string (must match `password`)
 *
 * @example
 * ```ts
 * const payload: UserRegisterData = {
 *   name: "Alice",
 *   email: "alice@example.com",
 *   password: "averysecurepassword123",
 *   confirm: "averysecurepassword123",
 * };
 * ```
 */
export type UserRegisterData = z.infer<typeof UserRegisterSchema>;

/**
 * Strongly-typed data shape for the **user login form**.
 *
 * Inferred directly from {@link UserLoginSchema}, ensuring that
 * form data and schema validation remain perfectly in sync.
 *
 * Fields:
 * - `email`: valid email string (≤ 255 chars)
 * - `password`: string (16–255 chars)
 *
 * @example
 * ```ts
 * const payload: UserLoginData = {
 *   email: "alice@example.com",
 *   password: "averysecurepassword123",
 * };
 * ```
 */
export type UserLoginData = z.infer<typeof UserLoginSchema>;
