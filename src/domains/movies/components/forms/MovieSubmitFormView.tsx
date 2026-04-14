/**
 * @fileoverview Movie submission form view for creating or editing movies.
 * Groups fields into Basic Details, Production & Release, and Media & Accessibility.
 */

import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import LanguageHookFormSelect from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {MovieForm, MovieFormValues} from "@/domains/movies/schema/form/MovieForm.types.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import {cn} from "@/common/lib/utils.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {MovieFormValuesSchema} from "@/domains/movies/schema/form/MovieForm.schema.ts";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";
import {PrimaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";
import {Movie} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {GenreHookFormSelect} from "@/views/admin/genres/_comp/input/GenreHookFormSelect.tsx";

type ViewProps = FormViewProps<Movie, MovieForm, MovieFormValues> & {
    className?: string;
    isPanel?: boolean;
};

/**
 * Renders the movie form UI with dynamic field activation and responsive grid layout.
 */
const MovieSubmitFormView: FC<ViewProps> = (props) => {
    const {form, submitHandler, mutation, className, disableFields, isPanel = false} = props;
    const {isPending, isSuccess} = mutation;

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

                    {activeFields.title && (
                        <HookFormInput name="title" label="Title" control={form.control} />
                    )}
                    {activeFields.originalTitle && (
                        <HookFormInput name="originalTitle" label="Original Title" control={form.control} />
                    )}
                    {activeFields.tagline && (
                        <HookFormInput name="tagline" label="Tagline" control={form.control} />
                    )}
                    {activeFields.synopsis && (
                        <HookFormTextArea name="synopsis" label="Synopsis" control={form.control} />
                    )}
                </fieldset>

                {/* Production & Release */}
                <fieldset className="space-y-3">
                    <section>
                        <h1 className="text-lg font-bold">Production & Release</h1>
                        <Separator/>
                    </section>

                    {activeFields.country && (
                        <CountryHookFormSelect name="country" label="Country" control={form.control} />
                    )}
                    {activeFields.runtime && (
                        <HookFormInput name="runtime" label="Duration (Min)" control={form.control} type="number" />
                    )}
                    {activeFields.originalLanguage && (
                        <LanguageHookFormSelect name="originalLanguage" label="Original Language" control={form.control} />
                    )}
                    {activeFields.isReleased && (
                        <HookFormCheckbox name="isReleased" label="Is Released?" control={form.control} />
                    )}
                    {activeFields.releaseDate && (
                        <HookFormInput name="releaseDate" label="Release Date" control={form.control} type="date" />
                    )}
                </fieldset>

                {/* Media & Accessibility */}
                <fieldset className="space-y-3">
                    <section>
                        <h1 className="text-lg font-bold">Media & Accessibility</h1>
                        <Separator/>
                    </section>

                    {activeFields.trailerURL && (
                        <HookFormInput name="trailerURL" label="Trailer URL" control={form.control} />
                    )}
                    {activeFields.languages && (
                        <LanguageHookFormSelect name="languages" label="Languages" control={form.control} isMulti />
                    )}
                    {activeFields.subtitles && (
                        <LanguageHookFormSelect name="subtitles" label="Subtitles" control={form.control} isMulti />
                    )}
                    {activeFields.genres && (
                        <GenreHookFormSelect name="genres" label="Genres" control={form.control} isMulti />
                    )}
                    {activeFields.isAvailable && (
                        <HookFormCheckbox name="isAvailable" label="Is Available?" control={form.control} />
                    )}
                </fieldset>

                <div className={cn(!isPanel && "lg:col-span-3")}>
                    <Button
                        type="submit"
                        className={cn(PrimaryButtonCSS, "w-full")}
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