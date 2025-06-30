import {FC} from 'react';
import useScreenSubmitForm from "@/pages/screens/hooks/screens/submit-screen-data/useScreenSubmitForm.ts";
import useScreenSubmitMutation from "@/pages/screens/hooks/screens/submit-screen-data/useScreenSubmitMutation.ts";
import ScreenSubmitFormView from "@/pages/screens/components/forms/ScreenSubmitFormView.tsx";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm} from "@/pages/screens/schema/forms/ScreenForm.types.ts";

interface Props {
    theatreID: ObjectId;
    onSubmit: (screen: Screen) => void;
    className?: string;
}

const TheatreScreenSubmitFormContainer: FC<Props> = ({theatreID, onSubmit, className}) => {
    const form = useScreenSubmitForm({presetValues: {theatre: theatreID}});
    const mutation = useScreenSubmitMutation({form, onSubmit});

    const submitHandler = (values: ScreenForm) => {
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
