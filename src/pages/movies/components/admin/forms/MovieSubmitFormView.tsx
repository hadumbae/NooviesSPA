import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import GenreHookFormSelect from "@/pages/genres/components/input/GenreHookFormSelect.tsx";
import LanguageHookFormSelect from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {UseMutationResult} from "@tanstack/react-query";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieForm, MovieFormValues} from "@/pages/movies/schema/form/MovieForm.types.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";

/**
 * Props for {@link MovieSubmitFormView}.
 */
type ViewProps = {
    /** React Hook Form instance for managing movie form state and validation. */
    form: UseFormReturn<MovieFormValues>;
    /** Handler function invoked on form submission. */
    submitHandler: SubmitHandler<MovieFormValues>;
    /** React Query mutation object for handling submission status and state. */
    mutation: UseMutationResult<Movie, unknown, MovieForm>;
    /** Optional list of form fields to disable. */
    disableFields?: (keyof MovieFormValues)[];
};

/**
 * Movie form component view.
 *
 * Renders the form fields for submitting or editing a movie,
 * grouped into sections: Basic Details, Production & Release, Media & Accessibility.
 *
 * Integrates with React Hook Form and React Query mutation for state management
 * and submission handling.
 *
 * @param props - Props including form instance, submission handler, mutation object, and optional disabled fields.
 *
 * @example
 * ```tsx
 * <MovieSubmitFormView
 *   form={form}
 *   submitHandler={onSubmit}
 *   mutation={mutation}
 *   disableFields={["title", "releaseDate"]}
 * />
 * ```
 */
const MovieSubmitFormView: FC<ViewProps> = ({form, submitHandler, mutation, disableFields}) => {
    const {isPending, isSuccess} = mutation;

    // Determine which fields are active (not disabled)
    const activeFields = {
        title: !disableFields?.includes("title"),
        originalTitle: !disableFields?.includes("originalTitle"),
        tagline: !disableFields?.includes("tagline"),
        country: !disableFields?.includes("country"),
        synopsis: !disableFields?.includes("synopsis"),
        releaseDate: !disableFields?.includes("releaseDate"),
        isReleased: !disableFields?.includes("isReleased"),
        runtime: !disableFields?.includes("runtime"),
        originalLanguage: !disableFields?.includes("originalLanguage"),
        trailerURL: !disableFields?.includes("trailerURL"),
        languages: !disableFields?.includes("languages"),
        subtitles: !disableFields?.includes("subtitles"),
        genres: !disableFields?.includes("genres"),
        isAvailable: !disableFields?.includes("isAvailable"),
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                {/* Basic Details Section */}
                <section>
                    <h1 className="text-lg font-bold">Basic Details</h1>
                    <Separator/>
                </section>

                {activeFields["title"] && (
                    <HookFormInput
                        name="title"
                        label="Title"
                        control={form.control}
                        description="The title of the movie."
                    />
                )}

                {activeFields["originalTitle"] && (
                    <HookFormInput
                        name="originalTitle"
                        label="Original Title"
                        control={form.control}
                        description="The original title of the movie."
                    />
                )}

                {activeFields["tagline"] && (
                    <HookFormInput
                        name="tagline"
                        label="Tagline"
                        control={form.control}
                        description="The tagline of the movie."
                    />
                )}

                {activeFields["synopsis"] && (
                    <HookFormTextArea
                        name="synopsis"
                        label="Synopsis"
                        control={form.control}
                        description="A short synopsis of the movie."
                    />
                )}

                {/* Production & Release Section */}
                <section>
                    <h1 className="text-lg font-bold">Production & Release</h1>
                    <Separator/>
                </section>

                {activeFields["country"] && (
                    <CountryHookFormSelect
                        name="country"
                        label="Country"
                        control={form.control}
                        isMulti={false}
                        description="The country of origin of the movie."
                    />
                )}

                {activeFields["runtime"] && (
                    <HookFormInput
                        name="runtime"
                        label="Duration In Minutes"
                        control={form.control}
                        description="The duration of the movie in minutes."
                        type="number"
                        min={1}
                        step={1}
                    />
                )}

                {activeFields["originalLanguage"] && (
                    <LanguageHookFormSelect
                        name="originalLanguage"
                        label="Original Language"
                        control={form.control}
                        isMulti={false}
                        description="The original language of the movie."
                    />
                )}

                {activeFields["isReleased"] && (
                    <HookFormCheckbox
                        name="isReleased"
                        label="Is Released?"
                        control={form.control}
                        description="Has the movie been released?"
                    />
                )}

                {activeFields["releaseDate"] && (
                    <HookFormInput
                        name="releaseDate"
                        label="Release Date"
                        control={form.control}
                        type="date"
                        description="The initial release date of the movie."
                    />
                )}

                {/* Media & Accessibility Section */}
                <section>
                    <h1 className="text-lg font-bold">Media & Accessibility</h1>
                    <Separator/>
                </section>

                {activeFields["trailerURL"] && (
                    <HookFormInput
                        name="trailerURL"
                        label="Trailer URL"
                        control={form.control}
                        description="The full URL of the movie's trailer, e.g. `https://google.com`."
                    />
                )}

                {activeFields["languages"] && (
                    <LanguageHookFormSelect
                        name="languages"
                        label="Languages"
                        control={form.control}
                        isMulti={true}
                        description="The languages in which the movie is available."
                    />
                )}

                {activeFields["subtitles"] && (
                    <LanguageHookFormSelect
                        name="subtitles"
                        label="Subtitles"
                        control={form.control}
                        isMulti={true}
                        description="The subtitles available for the movie."
                    />
                )}

                {activeFields["genres"] && (
                    <GenreHookFormSelect
                        name="genres"
                        label="Genres"
                        control={form.control}
                        isMulti={true}
                        description="The genre(s) of the movie."
                    />
                )}

                {activeFields["isAvailable"] && (
                    <HookFormCheckbox
                        name="isAvailable"
                        label="Is Available?"
                        control={form.control}
                        description="Is the movie available for reservation?"
                    />
                )}

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

export default MovieSubmitFormView;
