import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import useGenreForm from "@/pages/genres/hooks/useGenreForm.ts";
import useGenreSubmitMutation from "@/pages/genres/hooks/useGenreSubmitMutation.ts";
import {GenreSubmit} from "@/pages/genres/schema/GenreSubmitSchema.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {Button} from "@/common/components/ui/button.tsx";

interface Props {
    genre?: Genre;
    onGenreSubmit: (genre: Genre) => void;
}

const GenreSubmitForm: FC<Props> = ({genre, onGenreSubmit}) => {
    const form = useGenreForm({genre});
    const {mutate} = useGenreSubmitMutation({form, onSubmit: onGenreSubmit});

    const onSubmit = (values: GenreSubmit) => {
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
