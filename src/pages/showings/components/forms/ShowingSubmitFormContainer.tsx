import {FC, useEffect, useRef} from 'react';

import useShowingSubmitForm from "@/pages/showings/hooks/forms/useShowingSubmitForm.ts";
import useShowingSubmitMutation from "@/pages/showings/hooks/mutations/useShowingSubmitMutation.ts";

import {ShowingSubmit} from "@/pages/showings/schema/form/ShowingForm.schema.ts";
import ShowingSubmitFormView from "@/pages/showings/components/forms/ShowingSubmitFormView.tsx";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";

interface Props {
    showing?: Showing;
    onSubmit: (showing: Showing) => void
}

const ShowingSubmitFormContainer: FC<Props> = ({showing, onSubmit}) => {
    const form = useShowingSubmitForm({showing});
    const mutation = useShowingSubmitMutation({form, _id: showing?._id, onSubmit});

    const theatre = form.watch("theatre");
    const firstRender = useRef<boolean>(true);
    const secondRender = useRef<boolean>(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return
        }

        if (secondRender.current) {
            secondRender.current = false;
            return
        }

        form.resetField("screen");
    }, [theatre]);

    const onFormSubmit = (values: ShowingSubmit) => {
        console.log("Showing Submit Value: ", values);
        mutation.mutate(values);
    }

    return (
        <ShowingSubmitFormView
            mutation={mutation}
            form={form}
            onFormSubmit={onFormSubmit}
        />
    );
};

export default ShowingSubmitFormContainer;
