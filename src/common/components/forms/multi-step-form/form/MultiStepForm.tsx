/**
 * @fileoverview Multi-step form component for managing complex form flows with persistence.
 */

import {ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import {FormStepMeta} from "@/common/_feat/multi-step-form/types.ts";
import {DeepPartial, FieldValues, Path, useFormContext} from "react-hook-form";
import {
    MultiStepFormStateContext,
    MultiStepFormStateContextValues
} from "@/common/_feat/multi-step-form/contexts/stateContext.ts";
import {useDebouncedCallback} from "@/common/hooks/useDebouncedCallback.tsx";
import {useBaseMultiStepFormContext} from "@/common/_feat/multi-step-form";
import {
    MultiStepFormSetterContext,
    MultiStepFormSetterContextValues
} from "@/common/_feat/multi-step-form/contexts/setterContext.ts";
import {toast} from "react-toastify";

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
    const {localStorageKey, useStorage = true, storageType = "local"} = useBaseMultiStepFormContext<TForm>();
    const {trigger, reset, watch, formState, setValue} = useFormContext<TValues>();

    const storage = storageType === "session" ? sessionStorage : localStorage;

    // --- State ---

    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    const editKey = formState.defaultValues?._id ?? "new";
    const activeKey = `${localStorageKey}-${editKey}`

    const initialValues = useRef<TValues>(formState.defaultValues as TValues);
    const currentStep = stepMeta[currentStepIndex];

    // --- Hydrate From Local Storage ---

    useEffect(() => {
        try {
            const saved = storage.getItem(activeKey);

            if (useStorage && saved) {
                const parsed = JSON.parse(saved) as DeepPartial<TValues>;
                Object.entries(parsed).forEach(([key, value]) => setValue(key as Path<TValues>, value));
            }
        } catch (error: unknown) {
            toast.warning("Invalid Form Values");
            reset(initialValues.current);
        } finally {
            setIsHydrated(true);
        }
    }, [storage]);

    // --- Persist Values On Change ---

    const debouncedWatch = useDebouncedCallback((values: DeepPartial<TValues>) => {
        storage.setItem(activeKey, JSON.stringify(values));
    });

    useEffect(() => {
        if (!isHydrated || !useStorage) return;

        const subscription = watch((newValues) => debouncedWatch(newValues));
        return () => subscription.unsubscribe();
    }, [watch, isHydrated, activeKey]);

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
        reset(initialValues.current);
        storage.removeItem(activeKey);
        setCurrentStepIndex(0);
    }

    // --- Context Values ---

    const stateValues: MultiStepFormStateContextValues<TValues> = {
        stepMeta,
        isHydrated,
        currentStepIndex,
    };

    const setterValues: MultiStepFormSetterContextValues = {
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
