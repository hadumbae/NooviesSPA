/**
 * @file theatreQueryOptionFormContainer.tsx
 * @description Container component for the Theatre Query Option form. Handles form state,
 * preset values, field disabling, and synchronizes submitted values with URL search parameters.
 */

import { FC } from 'react';
import { SearchParamFormContainerProps } from "@/common/type/form/SearchParamFormProps.ts";
import { TheatreQueryOptionFormValues } from "@/pages/theatres/schema/queries/TheatreQueryOptionFormSchema.ts";
import useTheatreQueryOptionForm from "@/pages/theatres/hooks/features/theatre-query-option/useTheatreQueryOptionForm.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import { TheatreQueryOptionSchema } from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import { TheatreQueryOptions } from "@/pages/theatres/schema/queries/TheatreQueryOption.types.ts";
import TheatreQueryOptionFormView from "@/pages/theatres/components/admin/form/theatre-query-option/TheatreQueryOptionFormView.tsx";

/**
 * Props for {@link TheatreQueryOptionFormContainer}.
 */
type FormProps = SearchParamFormContainerProps<TheatreQueryOptions>;

/**
 * `theatreQueryOptionFormContainer` is the container for the theatre query option form.
 *
 * - Initializes the form using `useTheatreQueryOptionForm`.
 * - Applies preset values and optionally disables fields.
 * - Submits form values to update URL search parameters via `useParsedSearchParams`.
 * - Passes form state and handlers to {@link TheatreQueryOptionFormView} for rendering.
 *
 * @component
 * @example
 * ```tsx
 * <theatreQueryOptionFormContainer
 *   presetValues={{ sortByName: true }}
 *   disableFields={["sortBySeatCapacity"]}
 * />
 * ```
 */
const TheatreQueryOptionFormContainer: FC<FormProps> = (props) => {
    // ⚡ Props ⚡
    const { presetValues, disableFields, className } = props;

    const { setSearchParams } = useParsedSearchParams({
        schema: TheatreQueryOptionSchema,
        defaultValues: presetValues,
    });

    // ⚡ Form ⚡
    const form = useTheatreQueryOptionForm({ presetValues });

    // ⚡ Handler ⚡
    const onSubmit = (values: TheatreQueryOptionFormValues) => {
        setSearchParams(values as TheatreQueryOptions);
    };

    return (
        <TheatreQueryOptionFormView
            form={form}
            submitHandler={onSubmit}
            className={className}
            disableFields={disableFields}
        />
    );
};

export default TheatreQueryOptionFormContainer;
