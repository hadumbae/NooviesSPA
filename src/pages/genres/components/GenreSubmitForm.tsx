import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import {Button} from "@/common/components/ui/button.tsx";

import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";

import useGenreSubmitForm from "@/pages/genres/hooks/useGenreSubmitForm.ts";
import useGenreSubmitMutation from "@/pages/genres/hooks/useGenreSubmitMutation.ts";

import {GenreForm} from "@/pages/genres/schema/form/GenreForm.types.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";

interface Props {
    genre?: Genre;
    onGenreSubmit: (genre: Genre) => void;
}

const GenreSubmitForm: FC<Props> = ({genre, onGenreSubmit}) => {
    const form = useGenreSubmitForm({genre});
    const {mutate} = useGenreSubmitMutation({form, _id: genre?._id, onSubmit: onGenreSubmit});

    const onSubmit = (values: GenreForm) => {
        console.log("Values: ", values);
        mutate(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <HookFormInput
                    name="name"
                    label="Name"
                    description="The name of the genre."
                    control={form.control}
                />

                <HookFormTextArea
                    name="description"
                    label="Description"
                    control={form.control}
                    description="The description of the genre."
                />

                <Button className="w-full bg-primary">Submit</Button>
            </form>
        </Form>
    );
};

export default GenreSubmitForm;
