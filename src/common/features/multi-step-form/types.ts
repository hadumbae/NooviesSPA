/**
 * @fileoverview Type definitions for representing individual steps within a multi-step form sequence.
 */

import {ReactElement} from "react";
import {LucideIcon} from "lucide-react";
import {FieldValues, Path} from "react-hook-form";

/** Metadata describing the visual and structural properties of a form step. */
export type FormStepMeta<TValues extends FieldValues = FieldValues> = {
    title: string;
    stepCount: number;
    icon: LucideIcon;
    fields: Path<TValues>[];
};

/** Represents a single step in a multi-step form, mapping UI elements to specific form fields. */
export type FormStep<TValues extends FieldValues = FieldValues> = FormStepMeta<TValues> & {
    component: ReactElement;
};
