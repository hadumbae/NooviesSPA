/**
 * @file FormStep.types.ts
 * @description
 * Type definition for representing a single step in a multi-step form.
 *
 * This type is used in stepped or wizard-style forms to:
 * - Provide a title and icon for the step
 * - Track the step count/order
 * - Associate the step with a specific form component
 * - Define which form fields are relevant for the step
 *
 * @example
 * ```ts
 * const step: FormStep<MyFormValues> = {
 *   title: "User Details",
 *   stepCount: 1,
 *   icon: UserIcon,
 *   component: <UserDetailsForm />,
 *   fields: ["firstName", "lastName", "email"],
 * };
 * ```
 */

import {ReactElement} from "react";
import {LucideIcon} from "lucide-react";
import {FieldValues, Path} from "react-hook-form";

/**
 * Represents a single step in a multi-step form.
 *
 * @template TValues - The type of the form values, usually inferred from `react-hook-form`.
 *
 * @property title - The display title of the step.
 * @property stepCount - The numeric order of the step in the form sequence.
 * @property icon - A Lucide icon to visually represent the step.
 * @property component - The React component rendered for this step.
 * @property fields - An array of field paths (`Path<TValues>`) that are relevant for this step.
 *
 * @example
 * ```ts
 * const personalInfoStep: FormStep<MyFormValues> = {
 *   title: "Personal Info",
 *   stepCount: 1,
 *   icon: UserIcon,
 *   component: <PersonalInfoForm />,
 *   fields: ["firstName", "lastName", "dob"],
 * };
 * ```
 */
export type FormStep<TValues extends FieldValues = FieldValues> = {
    title: string;
    stepCount: number;
    icon: LucideIcon;
    component: ReactElement;
    fields: Path<TValues>[];
};
