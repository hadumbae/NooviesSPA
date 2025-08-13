import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {cn} from "@/common/lib/utils.ts";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {Person} from "@/pages/persons/schema/person/Person.types.ts";
import {PersonForm, PersonFormValues} from "@/pages/persons/schema/forms/PersonForm.types.ts";

/**
 * Props for the {@link PersonSubmitFormView} component.
 */
interface Props {
    /**
     * The `react-hook-form` instance controlling the `PersonFormValues` state.
     */
    form: UseFormReturn<PersonFormValues>;

    /**
     * Callback invoked when the form is submitted.
     *
     * Receives validated form values as the first parameter.
     */
    submitHandler: SubmitHandler<PersonFormValues>;

    /**
     * The mutation object returned from `usePersonSubmitMutation`.
     * Used to manage submit state (loading, errors, etc.).
     */
    mutation: UseMutationResult<Person, unknown, PersonForm>;

    /**
     * Optional list of field names to disable from rendering.
     * Fields in this array will not be displayed.
     */
    disableFields?: (keyof PersonFormValues)[];

    /**
     * Optional custom CSS class name to apply to the `<form>` element.
     */
    className?: string;
}

/**
 * Presentational component for rendering a form to create or update a `Person`.
 *
 * - Renders form fields conditionally based on `disableFields`.
 * - Uses reusable `HookForm*` components tied into `react-hook-form`.
 * - Displays a submit button that is disabled while the mutation is pending.
 *
 * @param form - The form instance returned by `usePersonSubmitForm`.
 * @param submitHandler - Function to handle form submission.
 * @param mutation - Mutation state and functions from `usePersonSubmitMutation`.
 * @param className - Optional CSS class for styling the `<form>` container.
 * @param disableFields - Optional array of field names to hide.
 *
 * @example
 * ```tsx
 * <PersonSubmitFormView
 *   form={form}
 *   submitHandler={handleSubmit}
 *   mutation={mutation}
 *   disableFields={["dob", "nationality"]}
 * />
 * ```
 */
const PersonSubmitFormView: FC<Props> = ({form, submitHandler, mutation, className, disableFields = []}) => {
    const {isPending} = mutation;

    const activeFields = {
        name: !disableFields.includes("name"),
        biography: !disableFields.includes("biography"),
        dob: !disableFields.includes("dob"),
        nationality: !disableFields.includes("nationality"),
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn("space-y-5", className)}>
                {
                    activeFields["name"]
                    && <HookFormInput
                        name="name"
                        label="Name"
                        description="The name of the person."
                        control={form.control}
                    />
                }

                {
                    activeFields["biography"]
                    && <HookFormTextArea
                        name="biography"
                        label="Biography"
                        control={form.control}
                        description="The biography of the person."
                    />
                }

                {
                    activeFields["dob"]
                    && <HookFormInput
                        name="dob"
                        label="Date Of Birth"
                        control={form.control}
                        type="date"
                        description="The Date of Birth of the person."
                    />
                }

                {
                    activeFields["nationality"]
                    && <CountryHookFormSelect
                        name="nationality"
                        label="Nationality"
                        control={form.control}
                        isMulti={false}
                        description="The nationality of the person."
                    />
                }

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-primary"
                    disabled={isPending}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default PersonSubmitFormView;
