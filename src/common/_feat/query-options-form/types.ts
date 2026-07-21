/**
 * @fileoverview Defines types and interfaces for the query options form components.
 */

import {FieldValues} from "react-hook-form";
import {ReactNode} from "react";

/** Represents the combined state of preset values and active query options. */
export type QueryOptionFormValues<TPreset extends FieldValues, TOptions extends FieldValues = TPreset> = {
    presetValues?: Partial<TPreset>;
    queryOptions: TOptions;
};

/** Configuration for updating query options and tracking active filter counts. */
export type QueryOptionsSetterConfig<TOptions = unknown> = {
    setQueryOptions: (values: TOptions) => void;
    activeOptions: number;
}

/** Props for the QueryOptionFormContainer component. */
export type QueryOptionFormContainerProps<TPreset extends FieldValues, TOptions extends FieldValues = TPreset> =
    QueryOptionFormValues<TPreset, TOptions> & QueryOptionsSetterConfig<TOptions> & {
    children: ReactNode;
};