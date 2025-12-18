/**
 * @file MultiStepForm.tsx
 * @description
 * Provides a fully-featured multi-step (wizard) form component using `react-hook-form`.
 *
 * Features:
 * - Supports multiple form steps with separate components for each step
 * - Persists form values across steps and reloads from `localStorage`
 * - Automatically handles validation for each step
 * - Provides navigation context via `MultiStepFormContext`
 * - Includes visual progress indicator and step navigation buttons
 *
 * @example
 * ```tsx
 * const form = useForm<MyFormValues>();
 * const steps: FormStep<MyFormValues>[] = [
 *   { stepCount: 1, title: "Personal Info", component: <Step1 />, fields: ["name", "email"] },
 *   { stepCount: 2, title: "Address", component: <Step2 />, fields: ["address", "city"] },
 * ];
 *
 * <MultiStepForm
 *     form={form}
 *     steps={steps}
 *     submitHandler={(data) => console.log(data)}
 *     localStorageKey="myFormData"
 * />
 * ```
 */

import {useEffect, useState} from "react";
import {FormStep} from "@/common/type/form/SteppedFormTypes.ts";
import {DeepPartial, FieldValues, FormProvider, SubmitHandler, UseFormReturn} from "react-hook-form";
import MultiStepFormProgressIndicator
    from "@/common/components/forms/multi-step-form/progress-indicator/MultiStepFormProgressIndicator.tsx";
import {
    MultiStepFormContext,
    MultiStepFormContextValues
} from "@/common/context/multi-step-form/MultiStepFormContext.ts";
import {ScrollArea, ScrollBar} from "@/common/components/ui/scroll-area.tsx";
import MultiStepFormStepButtons from "@/common/components/forms/multi-step-form/MultiStepFormStepButtons.tsx";
import useDebouncedCallback from "@/common/hooks/useDebouncedCallback.tsx";
import useFormInitialValues from "@/common/hooks/forms/useFormInitialValues.tsx";

/**
 * Props for the `MultiStepForm` component.
 *
 * @template TValues - Type of the form values used for all steps.
 *
 * @property localStorageKey - Key used to persist form values in `localStorage`.
 * @property form - The `react-hook-form` instance managing form state.
 * @property submitHandler - Callback executed when the final step is submitted.
 * @property steps - Array of form steps defining the order, components, and fields for validation.
 */
type FormProps<TValues extends FieldValues> = {
    localStorageKey: string;
    form: UseFormReturn<TValues>;
    submitHandler: SubmitHandler<TValues>;
    steps: FormStep<TValues>[];
};

/**
 * Multi-step form component that:
 * - Manages step state
 * - Persists values across steps
 * - Handles validation per step
 * - Provides navigation context to child components
 *
 * Wraps content in `FormProvider` and `MultiStepFormContext.Provider` to expose
 * state and helpers such as `changeStep`, `isFirstStep`, and `isLastStep`.
 *
 * @template TValues - Type of the form values used across all steps.
 *
 * @example
 * ```tsx
 * const form = useForm<MyFormValues>();
 * <MultiStepForm
 *     form={form}
 *     steps={formSteps}
 *     submitHandler={handleSubmit}
 *     localStorageKey="myFormData"
 * />
 * ```
 */
const MultiStepForm = <TValues extends FieldValues>(props: FormProps<TValues>) => {
    const {form, submitHandler, steps, localStorageKey} = props;
    const {trigger, reset} = form;

    // --- State ---

    const initialValues = useFormInitialValues({form});
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    const currentStep = steps[currentStepIndex];

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

        const subscription = form.watch((newValues) => debouncedWatch(newValues));

        return () => subscription.unsubscribe();
    }, [form, isHydrated, localStorageKey]);

    // --- Helpers ---

    const isFirstStep = () => currentStepIndex === 0;

    const isLastStep = () => currentStepIndex === steps.length - 1;

    const changeStep = async (direction: 1 | -1) => {
        if (direction === -1 && currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
            return;
        }

        const isValid = await trigger(currentStep.fields);

        if (isValid) {
            setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const resetForm = () => {
        initialValues.current && reset(initialValues.current);
        setCurrentStepIndex(0);
    }

    // --- Context Values ---

    const contextValues: MultiStepFormContextValues<TValues> = {
        initialValues: initialValues.current,
        isHydrated,
        steps,
        currentStep,
        currentStepIndex,
        isFirstStep,
        isLastStep,
        changeStep,
        resetForm,
    };

    // --- Render ---

    return (
        <MultiStepFormContext.Provider value={contextValues}>
            <FormProvider {...form}>
                <div className="p-3 md:p-10 space-y-5">
                    <ScrollArea className="w-full py-5">
                        <MultiStepFormProgressIndicator/>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>

                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                        {currentStep.component}

                        <MultiStepFormStepButtons/>
                    </form>
                </div>
            </FormProvider>
        </MultiStepFormContext.Provider>
    );
};

export default MultiStepForm;
