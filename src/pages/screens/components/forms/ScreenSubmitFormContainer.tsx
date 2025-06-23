import {FC} from 'react';
import useScreenSubmitForm from "@/pages/screens/hooks/forms/useScreenSubmitForm.ts";
import useScreenSubmitMutation from "@/pages/screens/hooks/mutations/useScreenSubmitMutation.ts";
import ScreenSubmitFormView from "@/pages/screens/components/forms/ScreenSubmitFormView.tsx";
import {Screen} from "@/pages/screens/schema/screen/Screen.types.ts";
import {ScreenForm} from "@/pages/screens/schema/forms/ScreenForm.types.ts";

interface Props {
    screen?: Screen;
    onSubmit: (screen: Screen) => void;
    className?: string;
}

const ScreenSubmitFormContainer: FC<Props> = ({screen, onSubmit, className}) => {
    const form = useScreenSubmitForm({screen});
    const mutation = useScreenSubmitMutation({form, onSubmit, _id: screen?._id});

    const onFormSubmit = (values: ScreenForm) => {
        console.log("Screen Submit Values: ", values);
        mutation.mutate(values);
    }

    return (
        <ScreenSubmitFormView
            form={form}
            mutation={mutation}
            submitHandler={onFormSubmit}
            className={className}
        />
    );
};

export default ScreenSubmitFormContainer;
