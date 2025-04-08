import {FC, useEffect, useRef} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";

import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import useShowingSubmitForm from "@/pages/showings/hooks/forms/useShowingSubmitForm.ts";
import useShowingSubmitMutation from "@/pages/showings/hooks/mutations/useShowingSubmitMutation.ts";

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import LanguageHookFormSelect from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";
import ScreenHookFormSelect from "@/pages/screens/components/inputs/ScreenHookFormSelect.tsx";
import MovieHookFormSelect from "@/pages/movies/components/ui/MovieHookFormSelect.tsx";
import {ShowingSubmit} from "@/pages/showings/schema/ShowingSubmitSchema.ts";

interface Props {
    showing?: Showing;
    onSubmit: (showing: Showing) => void
}

const ShowingSubmitForm: FC<Props> = ({showing, onSubmit}) => {
    const form = useShowingSubmitForm({showing});
    const {mutate, isPending, isSuccess} = useShowingSubmitMutation({form, _id: showing?._id, onSubmit});

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
        mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-3">
                <MovieHookFormSelect
                    control={form.control}
                    name="movie"
                    label="Movie"
                    description="The movie to be shown."
                />

                <TheatreHookFormSelect
                    control={form.control}
                    name="theatre"
                    label="Theatre"
                    description="The theatre at which the showing will be."
                />

                {
                    theatre &&
                    <ScreenHookFormSelect
                        control={form.control}
                        name="screen"
                        label="Screen"
                        filters={{theatre}}
                        description="The screen on which the movie will be shown."
                    />
                }

                <HookFormInput
                    name="startTime"
                    label="Start Time"
                    type="datetime-local"
                    control={form.control}
                    description="The date and time the showing will start."
                />

                <HookFormInput
                    name="endTime"
                    label="End Time"
                    type="datetime-local"
                    control={form.control}
                    description="The date and time the showing will end."
                />

                <HookFormInput
                    name="ticketPrice"
                    label="Ticket Price"
                    control={form.control}
                    description="The base price of the showing."
                    type="number"
                    min={1}
                    step={0.01}
                />


                <LanguageHookFormSelect
                    name="language"
                    label="Language"
                    control={form.control}
                    isMulti={false}
                    description="The languages in which the showing is available."
                />

                <LanguageHookFormSelect
                    name="subtitleLanguages"
                    label="Subtitles"
                    control={form.control}
                    isMulti={true}
                    description="The languages in which the showing is available."
                />

                <HookFormCheckbox
                    name="isSpecialEvent"
                    label="Is Special Event?"
                    control={form.control}
                />

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-primary"
                    disabled={isPending || isSuccess}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default ShowingSubmitForm;
