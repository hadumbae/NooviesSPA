import {z, ZodType, ZodTypeDef} from "zod";
import {ScreenTypeEnum} from "@/pages/screens/schema/ScreenType.enum.ts";
import {IScreenSubmit} from "@/pages/screens/interfaces/IScreenSubmit.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {CleanedNonNegativeNumberSchema,} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Zod schema for the initial values used in a screen creation or edit form.
 *
 * This schema is typically used in React form libraries like React Hook Form or Formik
 * to initialize form fields before user interaction. All fields accept generic form starter values.
 *
 * Fields:
 * - `name`: Initial value for the screen name field.
 * - `capacity`: Initial value for the seating capacity.
 * - `screenType`: Initial value for the type of screen (e.g. IMAX, Standard).
 * - `theatre`: Initial value for the theatre association.
 */
export const ScreenFormValuesSchema = z.object({
    name: FormStarterValueSchema,
    capacity: FormStarterValueSchema,
    screenType: FormStarterValueSchema,
    theatre: FormStarterValueSchema,
});

/**
 * Zod schema for validated and cleaned screen form values,
 * enforcing stricter constraints suitable for submission or processing.
 *
 * Fields:
 * - `name`: Non-empty string, max 255 characters.
 * - `capacity`: Non-negative number, cleaned/coerced from input.
 * - `screenType`: Must be a valid `ScreenTypeEnum` value.
 * - `theatre`: Valid ID string for associated theatre.
 */
export const ScreenFormRawSchema = z.object({
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),
    capacity: CleanedNonNegativeNumberSchema,
    screenType: ScreenTypeEnum,
    theatre: IDStringSchema,
});

/**
 * Strongly-typed Zod schema matching the `IScreenSubmit` interface,
 * representing the fully validated and typed screen form data.
 *
 * Input type is `unknown` to allow preprocessing of raw form input,
 * while output conforms exactly to `IScreenSubmit`.
 */
export const ScreenFormSchema = ScreenFormRawSchema as ZodType<IScreenSubmit, ZodTypeDef, unknown>;

