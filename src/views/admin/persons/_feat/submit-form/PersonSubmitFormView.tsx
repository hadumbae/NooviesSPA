/**
 * @fileoverview Presentational view for the Person submission form.
 * Handles the conditional rendering of form fields for creating or updating
 * Person records, strictly decoupled from business logic and data fetching.
 */

import {ReactElement} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import {cn} from "@/common/lib/utils.ts";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {Person} from "@/domains/persons/schema/person/Person.types.ts";
import {PersonFormData, PersonFormValues} from "@/domains/persons/_feat/submit-form";

/**
 * Props for the {@link PersonSubmitFormView} component.
 */
type FormProps = {
    form: UseFormReturn<PersonFormValues, unknown, PersonFormData>;
    submitHandler: SubmitHandler<PersonFormData>;
    mutation: UseMutationResult<Person, unknown, PersonFormData>;
    disableFields?: (keyof PersonFormValues)[];
    className?: string;
}

/**
 * A standardized form layout for Person entity management.
 */
function PersonSubmitFormView(
    {form, submitHandler, mutation, className, disableFields = []}: FormProps
): ReactElement {
    const {isPending} = mutation;

    const activeFields = {
        name: !disableFields.includes("name"),
        biography: !disableFields.includes("biography"),
        dob: !disableFields.includes("dob"),
        nationality: !disableFields.includes("nationality"),
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-5", className)}
            >
                {activeFields["name"] && (
                    <HookFormInput
                        name="name"
                        label="Name"
                        description="The legal or stage name of the person."
                        control={form.control}
                    />
                )}

                {activeFields["biography"] && (
                    <HookFormTextArea
                        name="biography"
                        label="Biography"
                        control={form.control}
                        description="A brief professional history or personal background."
                    />
                )}

                {activeFields["dob"] && (
                    <HookFormInput
                        name="dob"
                        label="Date Of Birth"
                        control={form.control}
                        type="date"
                        description="The birth date of the person."
                    />
                )}

                {activeFields["nationality"] && (
                    <CountryHookFormSelect
                        name="nationality"
                        label="Nationality"
                        control={form.control}
                        isMulti={false}
                        description="The primary country of citizenship or residence."
                    />
                )}

                <Button
                    type="submit"
                    variant="default"
                    className="w-full font-semibold"
                    disabled={isPending}
                >
                    {isPending ? "Saving..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
}

export default PersonSubmitFormView;