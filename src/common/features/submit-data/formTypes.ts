/**
 * @fileoverview Configuration and context types for standardized data submission forms.
 * Bridges the gap between raw form logic and UI-specific behavioral overrides.
 */

import {FieldValues} from "react-hook-form";

/**
 * Full configuration suite for generic form features.
 */
export type FormOptions<TForm extends FieldValues, TEntity = unknown> = {
    presetValues?: Partial<TForm>;
    resetOnSuccess?: boolean;
    resetOnError?: boolean;
    editEntity?: TEntity;
};