import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import GenreHookFormSelect from "@/pages/genres/components/input/GenreHookFormSelect.tsx";
import LanguageHookFormSelect from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieForm, MovieFormValues} from "@/pages/movies/schema/form/MovieForm.types.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormCheckbox from "@/common/components/forms/HookFormCheckbox.tsx";
import {cn} from "@/common/lib/utils.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {MovieFormValuesSchema} from "@/pages/movies/schema/form/MovieForm.schema.ts";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for `MovieSubmitFormView`.
 *
 * @template TEntity - The entity type managed by the form (here `Movie`).
 * @template TForm - The type of the form submission object (here `MovieForm`).
 * @template TFormValues - The type of the form values (here `MovieFormValues`).
 */
type ViewProps = FormViewProps<Movie, MovieForm, MovieFormValues> & {
    /** Optional CSS class applied to the form container. */
    className?: string;

    /** Indicates whether the form is rendered inside a panel layout. */
    isPanel?: boolean;
};

/**
 * `MovieSubmitFormView` renders the UI for creating or editing a movie.
 *
 * Features:
 * - Groups form fields into sections: Basic Details, Production & Release, Media & Accessibility.
 * - Uses React Hook Form for state management and validation.
 * - Integrates with React Query mutation object for submission state (`isPending`, `isSuccess`).
 * - Dynamically shows or hides fields based on `disableFields` prop.
 * - Supports single-column panel layout or multi-column layout for desktop screens.
 *
 * Sections:
 * 1. **Basic Details** – title, original title, tagline, synopsis.
 * 2. **Production & Release** – country, runtime, original language, release status/date.
 * 3. **Media & Accessibility** – trailer URL, languages, subtitles, genres, availability.
 *
 * @param props - Props including form instance, submission handler, mutation object, and optional UI options.
 * @param props.form - The React Hook Form instance for the movie form.
 * @param props.submitHandler - Callback invoked on form submission.
 * @param props.mutation - Mutation object for managing submission state.
 * @param props.disableFields - Optional array of field keys to disable in the UI.
 * @param props.className - Optional CSS class applied to the form container.
 * @param props.isPanel - Whether the form is rendered inside a panel (adjusts layout).
 *
 * @example
 * ```tsx
 * <MovieSubmitFormView
 *   form={form}
 *   submitHandler={onSubmit}
 *   mutation={mutation}
 *   disableFields={["title", "releaseDate"]}
 *   isPanel={true}
 * />
 * ```
 */
const MovieSubmitFormView: FC<ViewProps> = (props) => {
    const {form, submitHandler, mutation, className, disableFields, isPanel = false} = props;
    const {isPending, isSuccess} = mutation;

    // Determine which fields are active based on schema and disableFields
    const activeFields = getActiveSchemaInputFields({schema: MovieFormValuesSchema, disableFields});

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn(
                    "grid grid-cols-1 gap-4",
                    !isPanel && "lg:grid-cols-3",
                    className,
                )}
            >
                {/* Basic Details */}

                <fieldset className="space-y-3">
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
                </fieldset>

                {/* Production & Release */}

                <fieldset className="space-y-3">
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
                            type="number"
                            min={1}
                            step={1}
                            description="The duration of the movie in minutes."
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
                </fieldset>

                {/* Media & Accessibility */}

                <fieldset className="space-y-3">
                    <section>
                        <h1 className="text-lg font-bold">Media & Accessibility</h1>
                        <Separator/>
                    </section>

                    {activeFields["trailerURL"] && (
                        <HookFormInput
                            name="trailerURL"
                            label="Trailer URL"
                            control={form.control}
                            description="The full URL of the movie's trailer."
                        />
                    )}

                    {activeFields["languages"] && (
                        <LanguageHookFormSelect
                            name="languages"
                            label="Languages"
                            control={form.control}
                            isMulti={true}
                            description="Languages in which the movie is available."
                        />
                    )}

                    {activeFields["subtitles"] && (
                        <LanguageHookFormSelect
                            name="subtitles"
                            label="Subtitles"
                            control={form.control}
                            isMulti={true}
                            description="Available subtitles for the movie."
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
                </fieldset>

                {/* Submit Button */}

                <div className={cn(!isPanel && "lg:col-span-3")}>
                    <Button
                        type="submit"
                        variant="default"
                        className="w-full bg-primary"
                        disabled={isPending || isSuccess}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default MovieSubmitFormView;
