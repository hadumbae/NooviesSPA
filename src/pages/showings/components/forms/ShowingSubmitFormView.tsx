import {FC} from 'react';

import {UseMutationResult} from "@tanstack/react-query";
import {SubmitHandler, UseFormReturn} from "react-hook-form";

import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";
import LanguageHookFormSelect from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import TheatreHookFormSelect from "@/pages/theatres/components/TheatreHookFormSelect.tsx";
import ScreenHookFormSelect from "@/pages/screens/components/submit-form/inputs/ScreenHookFormSelect.tsx";
import MovieHookFormSelect from "@/pages/movies/components/ui/MovieHookFormSelect.tsx";

import {Showing} from "@/pages/showings/schema/base/ShowingSchema.ts";
import {ShowingSubmit} from "@/pages/showings/schema/ShowingSubmitSchema.ts";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    mutation: UseMutationResult<Showing, Error, ShowingSubmit>;
    form: UseFormReturn<ShowingSubmit>;
    onFormSubmit: SubmitHandler<ShowingSubmit>
    className?: string;
}

const ShowingSubmitFormView: FC<Props> = ({form, mutation, onFormSubmit, className}) => {
    const theatre = form.watch("theatre")
    const {isPending, isSuccess} = mutation;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className={cn("space-y-3",className)}>
                <fieldset className="space-y-3">
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
                </fieldset>

                <fieldset className="space-y-3">
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
                </fieldset>

                <HookFormInput
                    name="ticketPrice"
                    label="Ticket Price"
                    control={form.control}
                    description="The base price of the showing."
                    type="number"
                    min={1}
                    step={0.01}
                />

                <fieldset className="space-y-3">
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
                </fieldset>


                <fieldset className="grid grid-cols-2 gap-2">
                    <HookFormCheckbox
                        name="isActive"
                        label="Is Active?"
                        control={form.control}
                    />

                    <HookFormCheckbox
                        name="isSpecialEvent"
                        label="Is Special Event?"
                        control={form.control}
                    />
                </fieldset>

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

export default ShowingSubmitFormView;
