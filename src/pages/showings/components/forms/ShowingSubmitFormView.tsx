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

import {cn} from "@/common/lib/utils.ts";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";
import {ShowingForm, ShowingFormValues} from "@/pages/showings/schema/form/ShowingForm.types.ts";
import MovieQuickOverviewFetchCard from "@/pages/movies/components/admin/movie-details/MovieQuickOverviewFetchCard.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import TheatreQuickOverviewFetchCard from "@/pages/theatres/components/admin/theatre-details/TheatreQuickOverviewFetchCard.tsx";
import ShowingStatusHookFormSelect from "@/pages/showings/components/inputs/ShowingStatusHookFormSelect.tsx";

/**
 * Props for {@link ShowingSubmitFormView}.
 *
 * @property mutation - The mutation hook managing form submission state and response.
 * @property form - The `react-hook-form` instance controlling the showing form fields.
 * @property submitHandler - The callback executed when the form is submitted.
 * @property disableFields - Optional list of field names to disable in the form UI.
 * @property className - Optional class names for additional styling on the form element.
 */
export type FormViewProps = {
    mutation: UseMutationResult<Showing, unknown, ShowingForm>;
    form: UseFormReturn<ShowingFormValues>;
    submitHandler: SubmitHandler<ShowingFormValues>;
    disableFields?: (keyof ShowingFormValues)[];
    className?: string;
};

/**
 * Form component for creating or editing a Showing entity.
 *
 * @remarks
 * This component uses `react-hook-form` and integrates custom UI input components
 * to handle showing creation or editing workflows. It supports conditional field
 * disabling, dynamic field population (e.g., based on selected movie/theatre),
 * and visual quick-overview cards.
 *
 * @example
 * ```tsx
 * <ShowingSubmitFormView
 *   form={form}
 *   mutation={mutation}
 *   submitHandler={onSubmit}
 *   disableFields={["theatre", "status"]}
 * />
 * ```
 *
 * @category Components
 */
const ShowingSubmitFormView: FC<FormViewProps> = (props) => {
    const {form, mutation, submitHandler, disableFields, className} = props;

    // Watch selected entities for quick overview rendering
    const movie = form.watch("movie");
    const theatre = form.watch("theatre");

    const {isPending, isSuccess} = mutation;

    /** Field activation map controlling visibility and interactivity */
    const activeFields = {
        movie: !disableFields?.includes("movie"),
        theatre: !disableFields?.includes("theatre"),
        screen: !disableFields?.includes("screen"),
        startAtTime: !disableFields?.includes("startAtTime"),
        startAtDate: !disableFields?.includes("startAtDate"),
        endAtTime: !disableFields?.includes("endAtTime"),
        endAtDate: !disableFields?.includes("endAtDate"),
        ticketPrice: !disableFields?.includes("ticketPrice"),
        language: !disableFields?.includes("language"),
        subtitleLanguages: !disableFields?.includes("subtitleLanguages"),
        isSpecialEvent: !disableFields?.includes("isSpecialEvent"),
        isActive: !disableFields?.includes("isActive"),
        status: !disableFields?.includes("status"),
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("space-y-3", className)}
            >
                {/* 🎬 Movie Selection */}
                {activeFields.movie && (
                    <fieldset>
                        <MovieHookFormSelect
                            control={form.control}
                            name="movie"
                            label="Movie"
                            description="The movie to be shown."
                        />
                        {movie && <MovieQuickOverviewFetchCard movieID={movie as ObjectId}/>}
                    </fieldset>
                )}

                {/* 🎭 Theatre Selection */}
                {activeFields.theatre && (
                    <fieldset>
                        <TheatreHookFormSelect
                            control={form.control}
                            name="theatre"
                            label="Theatre"
                            description="The theatre at which the showing will be."
                        />
                        {theatre && <TheatreQuickOverviewFetchCard theatreID={theatre as ObjectId}/>}
                    </fieldset>
                )}

                {/* 🖥 Screen Selection */}
                {activeFields.screen && (
                    <fieldset className="space-y-3">
                        {theatre && (
                            <ScreenHookFormSelect
                                control={form.control}
                                name="screen"
                                label="Screen"
                                filters={{theatre}}
                                description="The screen on which the movie will be shown."
                            />
                        )}
                    </fieldset>
                )}

                {/* 🕓 Start Time */}
                <fieldset className="grid grid-cols-2 gap-3">
                    {activeFields.startAtDate && (
                        <HookFormInput
                            name="startAtDate"
                            label="Starting Date"
                            type="date"
                            control={form.control}
                            description="Date the showing starts."
                        />
                    )}

                    {activeFields.startAtTime && (
                        <HookFormInput
                            name="startAtTime"
                            label="Starting Time"
                            type="time"
                            control={form.control}
                            description="Time the showing starts."
                        />
                    )}
                </fieldset>

                {/* 🕔 End Time */}
                <fieldset className="grid grid-cols-2 gap-3">
                    {activeFields.endAtDate && (
                        <HookFormInput
                            name="endAtDate"
                            label="Ending Date"
                            type="date"
                            control={form.control}
                            description="Date the showing ends."
                        />
                    )}

                    {activeFields.endAtTime && (
                        <HookFormInput
                            name="endAtTime"
                            label="Ending Time"
                            type="time"
                            control={form.control}
                            description="Time the showing ends."
                        />
                    )}
                </fieldset>

                {/* 💵 Ticket Price */}
                {activeFields.ticketPrice && (
                    <HookFormInput
                        name="ticketPrice"
                        label="Ticket Price"
                        control={form.control}
                        description="The base price of the showing."
                        type="number"
                        min={1}
                        step={0.01}
                    />
                )}

                {/* 🌐 Languages */}
                <fieldset className="space-y-3">
                    {activeFields.language && (
                        <LanguageHookFormSelect
                            name="language"
                            label="Language"
                            control={form.control}
                            isMulti={false}
                            description="The language in which the showing is available."
                        />
                    )}

                    {activeFields.subtitleLanguages && (
                        <LanguageHookFormSelect
                            name="subtitleLanguages"
                            label="Subtitles"
                            control={form.control}
                            isMulti={false}
                            description="Available subtitle languages."
                        />
                    )}
                </fieldset>

                {/* ✅ Booleans */}
                <fieldset className="grid grid-cols-2 gap-2">
                    {activeFields.isActive && (
                        <HookFormCheckbox
                            name="isActive"
                            label="Is Active?"
                            control={form.control}
                        />
                    )}

                    {activeFields.isSpecialEvent && (
                        <HookFormCheckbox
                            name="isSpecialEvent"
                            label="Is Special Event?"
                            control={form.control}
                        />
                    )}
                </fieldset>

                {/* 📊 Status */}
                {activeFields.status && (
                    <ShowingStatusHookFormSelect
                        name="status"
                        label="Status"
                        control={form.control}
                        description="The current status of the showing."
                    />
                )}

                {/* 🚀 Submit */}
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
