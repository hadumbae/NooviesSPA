/**
 * @file ShowingTicketSelectorFormContainer.tsx
 *
 * Container component for the ticket selection form.
 *
 * Orchestrates:
 * - Form initialization with preset reservation values
 * - Submission mutation wiring
 * - Reservation-type–specific defaults
 *
 * Delegates all rendering to
 * {@link ShowingTicketSelectorFormView}.
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {ReservationDetails} from "@/pages/reservation/schema/model/reservation/ReservationDetails.types.ts";
import {ReserveTicketFormValues} from "@/pages/reservation/schema/forms/ReserveTicketFormValuesSchema.ts";
import {useReserveTicketForm} from "@/pages/reservation/forms/useReserveTicketForm.ts";
import {useReserveTicketSubmitMutation} from "@/pages/reservation/mutations/useReserveTicketSubmitMutation.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReservationType} from "@/pages/reservation/schema/enum/ReservationTypeEnumSchema.ts";
import {ReserveTicketForm} from "@/pages/reservation/schema/forms/ReserveTicketFormSchema.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import {ISO4217CurrencyCode} from "@/common/schema/enums/ISO4217CurrencyCodeEnumSchema.ts";
import ShowingTicketSelectorFormView
    from "@/pages/reservation/components/forms/ticket-selectors/ShowingTicketSelectorFormView.tsx";

/**
 * Props for {@link ShowingTicketSelectorFormContainer}.
 */
type ContainerProps = MutationOnSubmitParams<ReservationDetails> & {
    /** Target showing identifier */
    showingID: ObjectId;

    /** Reservation flow type */
    reservationType: ReservationType;

    /** Currency code for pricing (defaults to USD) */
    currency?: ISO4217CurrencyCode;
};

/**
 * Container for the showing ticket selector form.
 *
 * @remarks
 * - Injects reservation-specific preset values into the form
 * - Handles submission logging and mutation execution
 * - Keeps view component stateless and presentation-only
 *
 * @param props - Showing context and mutation configuration
 */
const ShowingTicketSelectorFormContainer = (
    {showingID, reservationType, currency = "USD", ...mutationProps}: ContainerProps
) => {
    const presetValues: Partial<ReserveTicketFormValues> = {
        currency,
        reservationType,
        showing: showingID,
        selectedSeating:
            reservationType === "RESERVED_SEATS" ? [] : null,
    };

    const form = useReserveTicketForm({presetValues});
    const mutation = useReserveTicketSubmitMutation({
        form,
        ...mutationProps,
    });

    /**
     * Handles form submission.
     */
    const submitData = (values: ReserveTicketFormValues) => {
        Logger.log({
            type: "DATA",
            msg: "Data for ticket reservation.",
            context: {values},
        });

        mutation.mutate(values as ReserveTicketForm);
    };

    return (
        <ShowingTicketSelectorFormView
            reservationType={reservationType}
            submitHandler={submitData}
            form={form}
        />
    );
};

export default ShowingTicketSelectorFormContainer;
