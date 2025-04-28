import {FC} from 'react';
import useScreenSubmitForm from "@/pages/screens/hooks/forms/useScreenSubmitForm.ts";
import useScreenSubmitMutation from "@/pages/screens/hooks/mutations/useScreenSubmitMutation.ts";
import {ScreenSubmit} from "@/pages/screens/schema/ScreenSubmitSchema.ts";
import ScreenSubmitFormView from "@/pages/screens/components/forms/ScreenSubmitFormView.tsx";
import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import {Screen} from "@/pages/screens/schema/base/ScreenSchema.ts";

interface Props {
    theatreID: ObjectId;
    onSubmit: (screen: Screen) => void;
    className?: string;
}

const TheatreScreenSubmitFormContainer: FC<Props> = ({theatreID, onSubmit, className}) => {
    const form = useScreenSubmitForm({defaultValues: {theatre: theatreID}});
    const mutation = useScreenSubmitMutation({form, onSubmit});

    const submitHandler = (values: ScreenSubmit) => {
        console.log("Theatre Screen Submit Values: ", values);
        mutation.mutate(values);
        form.reset();
    }

    const options = {hideTheatre: true, disableTheatre: true};

    return (
        <ScreenSubmitFormView
            form={form}
            mutation={mutation}
            submitHandler={submitHandler}
            className={className}
            options={options}
        />
    );
};

export default TheatreScreenSubmitFormContainer;
