/**
 * @file TheatreQueryOptionFormView.tsx
 * @description Renders the admin form view for configuring and submitting theatre query options.
 * Provides filter and sort fieldsets that auto-submit on change using a debounced form handler.
 */

import { FC } from 'react';
import { Form } from "@/common/components/ui/form.tsx";
import { TheatreQueryOptionFormValues } from "@/pages/theatres/schema/queries/TheatreQueryOptionFormSchema.ts";
import { SearchParamFormViewProps } from "@/common/type/form/SearchParamFormProps.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import { TheatreQueryOptionSchema } from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import { cn } from "@/common/lib/utils.ts";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import { Separator } from "@/common/components/ui/separator.tsx";
import TheatreQueryOptionFormSortFieldset from "@/pages/theatres/components/admin/form/theatre-query-option/TheatreQueryOptionFormSortFieldset.tsx";
import TheatreQueryOptionFormFilterFieldset from "@/pages/theatres/components/admin/form/theatre-query-option/TheatreQueryOptionFormFilterFieldset.tsx";

/**
 * Props for {@link TheatreQueryOptionFormView}.
 */
type FormProps = SearchParamFormViewProps<TheatreQueryOptionFormValues>;

/**
 * `TheatreQueryOptionFormView` renders a form for theatre query options,
 * allowing admins to filter and sort theatre data dynamically.
 *
 * - Uses `react-hook-form` for form management.
 * - Automatically submits using a debounced handler when values change.
 * - Divides form controls into two main sections:
 *   - **Filters**: Fieldset for filtering query parameters.
 *   - **Sorts**: Fieldset for sorting query results.
 * - Dynamically enables or disables fields based on active schema configuration.
 *
 * @component
 * @example
 * ```tsx
 * <TheatreQueryOptionFormView
 *   form={form}
 *   submitHandler={handleSubmit}
 *   disableFields={["region"]}
 * />
 * ```
 */
const TheatreQueryOptionFormView: FC<FormProps> = (props) => {
    // ⚡ Props ⚡
    const { form, submitHandler, disableFields, className } = props;

    // ⚡ Handler ⚡
    useDebouncedFormAutoSubmit({ form, submitHandler, timeout: 450 });

    // ⚡ Active ⚡
    const activeFields = getActiveSchemaInputFields({
        schema: TheatreQueryOptionSchema,
        disableFields
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-4", className)}
            >
                {/* Filter Section */}
                <section>
                    <SectionHeader>Filters</SectionHeader>
                    <TheatreQueryOptionFormFilterFieldset form={form} activeFields={activeFields} />
                </section>

                <Separator />

                {/* Sort Section */}
                <section>
                    <SectionHeader>Sorts</SectionHeader>
                    <TheatreQueryOptionFormSortFieldset form={form} activeFields={activeFields} />
                </section>
            </form>
        </Form>
    );
};

export default TheatreQueryOptionFormView;
