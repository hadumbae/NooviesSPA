/**
 * @fileoverview Multi-step form component for managing complex form flows with persistence.
 */

import {ReactElement, ReactNode, useEffect, useState} from "react";
import {FormStepMeta} from "@/common/features/multi-step-form/types.ts";
import {DeepPartial, FieldValues, useFormContext} from "react-hook-form";
import {
    MultiStepFormStateContext,
    MultiStepFormStateContextValues
} from "@/common/features/multi-step-form/contexts/stateContext.ts";
import useDebouncedCallback from "@/common/hooks/useDebouncedCallback.tsx";
import {useBaseMultiStepFormContext} from "@/common/features/multi-step-form";
import {
    MultiStepFormSetterContext,
    MultiStepFormSetterContextValues
} from "@/common/features/multi-step-form/contexts/setterContext.ts";

/** Props for the MultiStepForm component. */
type FormProps<TValues extends FieldValues> = {
    children: ReactNode;
    stepMeta: FormStepMeta<TValues>[];
};

/**
 * Provides a wizard-style form interface with state persistence and step validation.
 */
export function MultiStepForm<TValues extends FieldValues, TForm extends FieldValues = TValues>(
    {children, stepMeta}: FormProps<TValues>
): ReactElement {
    const {localStorageKey} = useBaseMultiStepFormContext<TForm>();
    const {trigger, reset, watch, formState} = useFormContext<TValues>();

    // --- State ---

    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    const currentStep = stepMeta[currentStepIndex];
    const initialValues = formState.defaultValues as TValues;

    // --- Hydrate From Local Storage ---

    useEffect(() => {
        try {
            const saved = localStorage.getItem(localStorageKey);

            if (saved) {
                const parsed = JSON.parse(saved);
                reset(parsed);
            }

            setIsHydrated(true);
        } catch (error: unknown) {
            reset();
        }
    }, [reset, currentStepIndex]);

    // --- Persist Values On Change ---

    const debouncedWatch = useDebouncedCallback((values: DeepPartial<TValues>) => {
        localStorage.setItem(localStorageKey, JSON.stringify(values[0]));
    });

    useEffect(() => {
        if (!isHydrated) return;

        const subscription = watch((newValues) => debouncedWatch(newValues));
        return () => subscription.unsubscribe();
    }, [watch, isHydrated, localStorageKey]);

    // --- Helpers ---

    const isFirstStep = () => currentStepIndex === 0;
    const isLastStep = () => currentStepIndex === stepMeta.length - 1;
    const changeStep = async (direction: 1 | -1) => {
        if (direction === -1 && currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
            return;
        }

        const isValid = await trigger(currentStep.fields);
        if (isValid) setCurrentStepIndex((prev) => Math.min(prev + 1, stepMeta.length - 1));
    }

    const resetForm = () => {
        reset(initialValues);
        setCurrentStepIndex(0);
    }

    // --- Context Values ---

    const stateValues: MultiStepFormStateContextValues<TValues> = {
        stepMeta,
        initialValues,
        isHydrated,
        currentStepIndex,
    };

    const setterValues: MultiStepFormSetterContextValues<TValues> = {
        isFirstStep,
        isLastStep,
        changeStep,
        resetForm,
    };

    // --- Render ---

    return (
        <MultiStepFormStateContext.Provider value={stateValues}>
            <MultiStepFormSetterContext.Provider value={setterValues}>
                {children}
            </MultiStepFormSetterContext.Provider>
        </MultiStepFormStateContext.Provider>
    );
}
