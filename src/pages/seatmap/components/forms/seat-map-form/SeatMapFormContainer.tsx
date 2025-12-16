import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {SeatMap, SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import {SeatMapForm, SeatMapFormValues} from "@/pages/seatmap/schema/form/SeatMapForm.types.ts";
import useSeatMapForm from "@/pages/seatmap/hooks/forms/form/useSeatMapForm.ts";
import useSeatMapSubmitMutation from "@/pages/seatmap/hooks/mutations/useSeatMapSubmitMutation.ts";
import SeatMapFormView from "@/pages/seatmap/components/forms/seat-map-form/SeatMapFormView.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

type FormProps = FormContainerProps<SeatMapDetails, SeatMap, SeatMapFormValues, SeatMapForm> & {
    className?: string;
    seatMapShowing: ObjectId;
    seatMapScreen: ObjectId;
};

const SeatMapFormContainer = (props: FormProps) => {
    const {
        className,
        seatMapShowing,
        seatMapScreen,
        successMessage,
        onSubmitSuccess,
        errorMessage,
        onSubmitError,
        presetValues,
        disableFields,
        editEntity,
        isPanel,
    } = props;

    // --- Initialise Form ---
    const form = useSeatMapForm({
        presetValues,
        seatMap: editEntity,
        showingID: seatMapShowing
    });

    // --- Initialise Mutation ---
    const mutation = useSeatMapSubmitMutation({
        form,
        successMessage,
        onSubmitSuccess,
        errorMessage,
        onSubmitError,
    });

    // --- Submit Handler ---
    const submitSeatMap = (values: SeatMapFormValues) => {
        mutation.mutate(values as SeatMapForm);
    }

    // --- Render ---
    return (
        <SeatMapFormView
            className={className}
            seatMapScreen={seatMapScreen}
            form={form}
            submitHandler={submitSeatMap}
            mutation={mutation}
            disableFields={disableFields}
            isPanel={isPanel}
        />
    );
};

export default SeatMapFormContainer;
