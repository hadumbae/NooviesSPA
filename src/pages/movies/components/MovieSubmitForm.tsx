import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";

import {Movie} from "@/pages/movies/schema/MovieSchema.ts";
import useMovieSubmitForm from "@/pages/movies/hooks/forms/useMovieSubmitForm.ts";
import useMovieSubmitMutation from "@/pages/movies/hooks/mutations/useMovieSubmitMutation.ts";

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormDatePicker from "@/common/components/forms/HookFormDatePicker.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import LanguageHookFormSelect from "@/common/components/forms/values/LanguageHookFormSelect.tsx";
import GenreHookFormSelect from "@/pages/genres/components/form/GenreHookFormSelect.tsx";
import PersonHookFormSelect from "@/pages/persons/components/form/PersonHookFormSelect.tsx";

interface Props {
    movie?: Movie;
    onSubmit: (movie: Movie) => void
}

const MovieSubmitForm: FC<Props> = ({movie, onSubmit}) => {
    const form = useMovieSubmitForm({movie});
    const {mutate, isPending, isSuccess} = useMovieSubmitMutation({form, _id: movie?._id, onSubmit});

    const onFormSubmit = (values:any) => {
        console.log("Movie Submit Value: ", values);
        mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-3">
                <HookFormInput
                    name="title"
                    label="Title"
                    control={form.control}
                    description="The title of the movie."
                />

                <HookFormTextArea
                    name="description"
                    label="Description"
                    control={form.control}
                    description="A short description of the movie."
                />

                <GenreHookFormSelect
                    name="genres"
                    label="Genres"
                    control={form.control}
                    isMulti={true}
                    description="The genre(s) of the movie."
                />

                <PersonHookFormSelect
                    name="directors"
                    label="Directors"
                    control={form.control}
                    isMulti={true}
                    description="The directors of the movie."
                />

                <PersonHookFormSelect
                    name="cast"
                    label="Cast"
                    control={form.control}
                    isMulti={true}
                    description="The cast of the movie."
                />

                {/*releaseDate*/}
                <HookFormDatePicker
                    name="releaseDate"
                    label="Release Date"
                    control={form.control}
                    description="The initial release date of the movie."
                />

                <HookFormInput
                    name="durationInMinutes"
                    label="Duration In Minutes"
                    control={form.control}
                    description="The duration of the movie in minutes."
                    type="number"
                    min={1}
                    step={1}
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

                <HookFormInput
                    name="price"
                    label="Price"
                    control={form.control}
                    description="The base price of the movie."
                    type="number"
                    min={1}
                    step={0.01}
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

export default MovieSubmitForm;
