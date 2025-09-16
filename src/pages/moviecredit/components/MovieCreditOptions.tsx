import {FC, ReactNode} from 'react';
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Ellipsis} from "lucide-react";
import MovieCreditSubmitFormPanel from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormPanel.tsx";
import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import {EntityOptionProps} from "@/common/type/EntityOptionProps.ts";
import MovieCreditDeleteWarningDialog from "@/pages/moviecredit/components/dialog/MovieCreditDeleteWarningDialog.tsx";

type OptionsProps = EntityOptionProps<MovieCredit, MovieCredit, MovieCreditFormValues> & {
    children?: ReactNode
};

const MovieCreditOptions: FC<OptionsProps> = (props) => {
    const {children, onSubmit, onDelete, entity} = props;
    const {_id} = entity;

    const defaultButton = (
        <Button variant="outline">
            <Ellipsis/>
        </Button>
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children ?? defaultButton}
            </PopoverTrigger>
            <PopoverContent className="w-40 flex flex-col p-0">
                <MovieCreditSubmitFormPanel {...onSubmit} isEditing={true} entity={entity}>
                    <Button variant="link">Edit</Button>
                </MovieCreditSubmitFormPanel>
                <MovieCreditDeleteWarningDialog {...onDelete} _id={_id}>
                    <Button variant="link">Delete</Button>
                </MovieCreditDeleteWarningDialog>
            </PopoverContent>
        </Popover>
    );
};

export default MovieCreditOptions;
