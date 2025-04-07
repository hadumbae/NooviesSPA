import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import useScreenSubmitForm from "@/pages/screens/hooks/useScreenSubmitForm.ts";
import useScreenSubmitMutation from "@/pages/screens/hooks/useScreenSubmitMutation.ts";
import {ScreenSubmit} from "@/pages/screens/schema/ScreenSubmitSchema.ts";
import ScreenSubmitFormView from "@/pages/screens/components/forms/ScreenSubmitFormView.tsx";

interface Props {
    screen?: Screen;
    onSubmit: (screen: Screen) => void;
    className?: string;
}

const ScreenSubmitFormContainer: FC<Props> = ({screen, onSubmit, className}) => {
    const form = useScreenSubmitForm({screen});
    const mutation = useScreenSubmitMutation({form, onSubmit, _id: screen?._id});

    const onFormSubmit = (values: ScreenSubmit) => {
        console.log("Screen Submit Values: ", values);
        mutation.mutate(values);
    }

    return (
        <ScreenSubmitFormView
            form={form}
            mutation={mutation}
            onFormSubmit={onFormSubmit}
            className={className}
        />
    );
};

export default ScreenSubmitFormContainer;
