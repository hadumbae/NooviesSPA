/**
 * @fileoverview Type definitions for multi-step form sequences and step metadata.
 */

import {ReactElement} from "react";
import {LucideIcon} from "lucide-react";
import {FieldValues, Path} from "react-hook-form";
import {StorageType} from "@/common/_types";

/** Metadata describing the visual and structural properties of a form step. */
export type FormStepMeta<TValues extends FieldValues = FieldValues> = {
    title: string;
    stepCount: number;
    icon: LucideIcon;
    fields: Path<TValues>[];
};

/** Configuration options for multi-step form storage persistence. */
export type MultiStepFormStorageConfig = {
    localStorageKey: string;
    useStorage?: boolean;
    storageType?: StorageType;
}

/** Represents a single step in a multi-step form, mapping UI elements to specific form fields. */
export type FormStep<TValues extends FieldValues = FieldValues> = FormStepMeta<TValues> & {
    component: ReactElement;
};