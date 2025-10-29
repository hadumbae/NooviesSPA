import {FC} from 'react';
import useSeatsByRowSubmitForm from "@/pages/seats/hooks/features/admin/submit-seats-by-row/useSeatsByRowSubmitForm.ts";
import useSeatsByRowSubmitMutation from "@/pages/seats/hooks/features/admin/submit-seats-by-row/useSeatsByRowSubmitMutation.ts";
import SeatsByRowSubmitFormView
    from "@/pages/seats/components/seats-by-row/row-seats-submit-form/SeatsByRowSubmitFormView.tsx";
import {SeatsByRowForm, SeatsByRowFormValues} from "@/pages/seats/schema/form/SeatForm.types.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {SeatArray} from "@/pages/seats/schema/seat/Seat.types.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";

/**
 * Props for the SeatsByRowSubmitFormContainer component.
 *
 * Combines:
 * - Mutation submission parameters (excluding `validationSchema`) via {@link MutationOnSubmitParams}.
 * - Optional form UI configuration via {@link FormOptions}.
 * - Optional CSS class for styling.
 */
type ContainerProps =
    Omit<MutationOnSubmitParams<SeatArray>, "validationSchema"> &
    FormOptions<SeatsByRowFormValues> &
    {
        /** Optional CSS class applied to the container wrapper. */
        className?: string;
    };

/**
 * Container component for submitting seats by row.
 *
 * Handles:
 * - Initializing the React Hook Form instance for seat rows.
 * - Managing the mutation for form submission.
 * - Passing props and submit handler to {@link SeatsByRowSubmitFormView}.
 *
 * @param props - Props including mutation options, form UI configuration, and optional className.
 *
 * @example
 * ```tsx
 * <SeatsByRowSubmitFormContainer
 *   presetValues={{ numberOfSeats: 5 }}
 *   disableFields={['row']}
 *   successMessage="Seats submitted successfully!"
 *   errorMessage="Failed to submit seats."
 * />
 * ```
 */
const SeatsByRowSubmitFormContainer: FC<ContainerProps> = (props) => {
    const {presetValues, disableFields, className, ...options} = props;

    const form = useSeatsByRowSubmitForm({presetValues});
    const mutation = useSeatsByRowSubmitMutation({form, ...options});

    const onFormSubmit = (values: SeatsByRowFormValues) => {
        Logger.log({msg: "[Seats By Row] Form Values", context: {values}});
        mutation.mutate(values as SeatsByRowForm);
    };

    return (
        <SeatsByRowSubmitFormView
            form={form}
            mutation={mutation}
            submitHandler={onFormSubmit}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default SeatsByRowSubmitFormContainer;
