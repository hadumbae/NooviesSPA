import {ReactNode, useMemo, useState} from "react";
import {SeatMapForm, SeatMapFormValues} from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {SeatMap} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {
    SeatMapFormContext,
    SeatMapFormContextValues,
} from "@/pages/seatmap/context/seat-map-form-context/SeatMapFormContext.ts";

/**
 * @summary
 * Props for {@link SeatMapFormContextProvider}.
 */
type ProviderProps =
    FormOptions<SeatMapFormValues, SeatMapForm, SeatMap> & {
    children: ReactNode;
};

/**
 * @component SeatMapFormContextProvider
 *
 * @description
 * Provides form state context for SeatMap create/edit workflows.
 *
 * Manages:
 * - Initial form values (loaded or reset state)
 * - Current form values (live edits)
 *
 * Exposes setters and state via {@link SeatMapFormContext} for
 * consumption by nested form components.
 *
 * @remarks
 * - Designed to work alongside `react-hook-form`–based logic.
 * - Context is intentionally initialized as `undefined` to enforce
 *   provider usage through `useRequiredContext`.
 */
const SeatMapFormContextProvider = ({children, ...options}: ProviderProps) => {
    const [initialValues, setInitialValues] = useState<SeatMapFormValues | undefined>(undefined);
    const [currentValues, setCurrentValues] = useState<SeatMapFormValues | undefined>(undefined);

    const values: SeatMapFormContextValues = useMemo(
        () => ({
            initialValues,
            setInitialValues,
            currentValues,
            setCurrentValues,
            options,
        }),
        [initialValues, currentValues, options]
    );

    return (
        <SeatMapFormContext.Provider value={values}>
            {children}
        </SeatMapFormContext.Provider>
    );
};

export default SeatMapFormContextProvider;
