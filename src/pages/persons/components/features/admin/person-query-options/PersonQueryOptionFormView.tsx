import { FC } from 'react';
import { SearchParamFormViewProps } from "@/common/type/form/SearchParamFormProps.ts";
import { PersonQueryOptionFormValues } from "@/pages/persons/schema/queries/PersonQueryOptionFormValueSchema.ts";
import { Form } from "@/common/components/ui/form.tsx";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import { PersonQueryOptionsSchema } from "@/pages/persons/schema/queries/PersonQueryOption.schema.ts";
import { Separator } from "@/common/components/ui/separator.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import { cn } from "@/common/lib/utils.ts";
import HookFormSortToggle from "@/common/components/forms/HookFormSortToggle.tsx";

type FormViewProps = SearchParamFormViewProps<PersonQueryOptionFormValues>;

/**
 * Form view component for managing and displaying person query options.
 *
 * @remarks
 * This component provides both **filter** and **sort** controls for person entities,
 * automatically synchronizing form state with URL search parameters.
 *
 * It uses a debounced auto-submit hook to reduce redundant queries when users
 * change input values in rapid succession.
 *
 * The form dynamically determines which fields are active and enabled
 * based on the provided schema (`PersonQueryOptionsSchema`) and optional
 * `disableFields` prop.
 *
 * @component
 * @example
 * ```tsx
 * <PersonQueryOptionFormView
 *   form={formMethods}
 *   submitHandler={handleSearch}
 *   disableFields={["nationality"]}
 *   className="space-y-6"
 * />
 * ```
 *
 * @param props - Form configuration and React Hook Form integration.
 * @param props.form - The React Hook Form instance containing form state and controls.
 * @param props.submitHandler - The handler function executed on form submission.
 * @param [props.disableFields] - Optional list of field names to disable in the form.
 * @param [props.className] - Optional CSS class name for customizing layout or spacing.
 *
 * @see {@link SearchParamFormViewProps}
 * @see {@link useDebouncedFormAutoSubmit}
 * @see {@link getActiveSchemaInputFields}
 */
const PersonQueryOptionFormView: FC<FormViewProps> = (props) => {
    const { form, submitHandler, disableFields, className } = props;

    useDebouncedFormAutoSubmit({ form, submitHandler, timeout: 450 });

    const activeFields = getActiveSchemaInputFields({
        schema: PersonQueryOptionsSchema,
        disableFields,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                {/* === Filters === */}
                <section>
                    <SectionHeader>Filters</SectionHeader>

                    <section className="grid grid-cols-1 gap-2">
                        {activeFields["name"] && (
                            <HookFormInput
                                name="name"
                                label="Name"
                                control={form.control}
                            />
                        )}

                        {activeFields["dob"] && (
                            <HookFormInput
                                name="dob"
                                label="Date Of Birth"
                                type="date"
                                control={form.control}
                            />
                        )}

                        {activeFields["nationality"] && (
                            <CountryHookFormSelect
                                name="nationality"
                                label="Nationality"
                                control={form.control}
                            />
                        )}
                    </section>
                </section>

                <Separator />

                {/* === Sorts === */}
                <section>
                    <SectionHeader>Sorts</SectionHeader>

                    <section className="flex flex-wrap space-x-3">
                        <HookFormSortToggle
                            name="sortByName"
                            label="Name"
                            control={form.control}
                        />
                        <HookFormSortToggle
                            name="sortByDOB"
                            label="Date Of Birth"
                            control={form.control}
                        />
                        <HookFormSortToggle
                            name="sortByNationality"
                            label="Nationality"
                            control={form.control}
                        />
                    </section>
                </section>
            </form>
        </Form>
    );
};

export default PersonQueryOptionFormView;
