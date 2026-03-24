/**
 * @file ScreenFormContextProvider.tsx
 * @summary
 * Context provider that manages the full lifecycle state for `Screen` forms.
 *
 * Exposes shared state for:
 * - `initialValues`: baseline form values (defaults or server-loaded)
 * - `currentValues`: active values updated during editing
 * - `returnedData`: server-returned `ScreenDetails` after submission
 * - `options`: configuration controlling form behavior (preset values, disabled fields, reset logic)
 *
 * Components within this provider can access the shared state
 * through {@link ScreenFormContext}.
 */

import {ReactNode, useMemo, useState} from "react";
import {ScreenFormContext} from "@/domains/theatre-screens/contexts/screen-form/ScreenFormContext.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {ScreenForm, ScreenFormValues} from "@/domains/theatre-screens/schema/forms/ScreenForm.types.ts";
import {FormContextValues} from "@/common/type/context/FormContextValues.ts";
import {TheatreScreen} from "@/domains/theatre-screens/schema/model";

type ProviderType = FormOptions<ScreenFormValues, ScreenForm, TheatreScreen> & {
    children: ReactNode;
};

/**
 * Provides `ScreenFormContext` to its children.
 *
 * Maintains and exposes shared form lifecycle state:
 * - `initialValues` — defaults or edit-mode starting values
 * - `currentValues` — live form state updated during editing
 * - `options` — additional form configuration
 *
 * @param props - Children and optional form configuration.
 * @returns Context provider supplying the managed form state.
 *
 * @example
 * ```tsx
 * <ScreenFormContextProvider presetValues={{ name: "Default" }}>
 *   <ScreenForm />
 * </ScreenFormContextProvider>
 * ```
 */
const ScreenFormContextProvider = (props: ProviderType) => {
    const {children, ...options} = props;

    // --- State ---
    const [initialValues, setInitialValues] = useState<ScreenFormValues | undefined>(undefined);
    const [currentValues, setCurrentValues] = useState<ScreenFormValues | undefined>(undefined);

    // --- Aggregated Context Value ---
    const values: FormContextValues<ScreenFormValues, ScreenForm, TheatreScreen> = useMemo(
        () => ({
            initialValues,
            setInitialValues,
            currentValues,
            setCurrentValues,
            options,
        }),
        [initialValues, currentValues, options],
    );

    // --- Render ---

    return (
        <ScreenFormContext.Provider value={values}>
            {children}
        </ScreenFormContext.Provider>
    );
};

export default ScreenFormContextProvider;
