import {z, ZodType} from "zod";
import {ScreenTypeEnum} from "@/pages/screens/schema/ScreenType.enum.ts";
import {IScreenSubmit} from "@/pages/screens/interfaces/IScreenSubmit.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/NonNegativeNumberSchema.ts";

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
 * Zod schema for validating screen form submissions.
 *
 * This schema enforces constraints on submitted form data to ensure that the input
 * is safe, correctly typed, and aligned with business rules. It conforms to the
 * {@link IScreenSubmit} interface.
 *
 * Fields:
 * - `name`: Non-empty string with a maximum of 255 characters.
 * - `capacity`: A non-negative number indicating seating capacity.
 * - `screenType`: Enum representing allowed screen types.
 * - `theatre`: A valid string ID corresponding to a theatre.
 */
export const ScreenFormSchema: ZodType<IScreenSubmit> = z.object({
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),
    capacity: NonNegativeNumberSchema,
    screenType: ScreenTypeEnum,
    theatre: IDStringSchema,
});

