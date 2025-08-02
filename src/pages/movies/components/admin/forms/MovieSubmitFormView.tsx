import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import GenreHookFormSelect from "@/pages/genres/components/input/GenreHookFormSelect.tsx";
import LanguageHookFormSelect from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {MovieSubmit} from "@/pages/movies/schema/form/MovieSubmitSchema.ts";
import {UseMutationResult} from "@tanstack/react-query";
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";

interface ViewProps {
    form: UseFormReturn<MovieSubmit>;
    submitHandler: SubmitHandler<MovieSubmit>;
    mutation: UseMutationResult<Movie, Error, MovieSubmit>;
}

const MovieSubmitFormView: FC<ViewProps> = ({form, submitHandler, mutation}) => {
    const {isPending, isSuccess} = mutation;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                <HookFormInput
                    name="title"
                    label="Title"
                    control={form.control}
                    description="The title of the movie."
                />

                <HookFormInput
                    name="originalTitle"
                    label="Original Title"
                    control={form.control}
                    description="The original title of the movie."
                />

                <HookFormInput
                    name="tagline"
                    label="Tagline"
                    control={form.control}
                    description="The tagline of the movie."
                />

                <CountryHookFormSelect
                    name="country"
                    label="Country"
                    control={form.control}
                    isMulti={false}
                    description="The country of origin of the movie."
                />

                <HookFormTextArea
                    name="synopsis"
                    label="Synopsis"
                    control={form.control}
                    description="A short synopsis of the movie."
                />

                <GenreHookFormSelect
                    name="genres"
                    label="Genres"
                    control={form.control}
                    isMulti={true}
                    description="The genre(s) of the movie."
                />

                <HookFormInput
                    name="releaseDate"
                    label="Release Date"
                    control={form.control}
                    type="date"
                    description="The initial release date of the movie."
                />

                <HookFormInput
                    name="runtime"
                    label="Duration In Minutes"
                    control={form.control}
                    description="The duration of the movie in minutes."
                    type="number"
                    min={1}
                    step={1}
                />

                <LanguageHookFormSelect
                    name="originalLanguage"
                    label="Original Language"
                    control={form.control}
                    isMulti={false}
                    description="The original language of the movie."
                />

                <LanguageHookFormSelect
                    name="languages"
                    label="Languages"
                    control={form.control}
                    isMulti={true}
                    description="The languages in which the movie is available."
                />

                <LanguageHookFormSelect
                    name="subtitles"
                    label="Subtitles"
                    control={form.control}
                    isMulti={true}
                    description="The subtitles available for the movie."
                />

                <HookFormInput
                    name="trailerURL"
                    label="Trailer URL"
                    control={form.control}
                    description="The full URL of the movie's trailer, e.g. `https://google.com`."
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

export default MovieSubmitFormView;
