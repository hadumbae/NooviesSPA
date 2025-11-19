import {FC, ReactNode} from 'react';
import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Ellipsis} from "lucide-react";
import MovieCreditSubmitFormPanel from "@/pages/moviecredit/components/forms/MovieCreditSubmitFormPanel.tsx";
import {MovieCreditFormValues} from "@/pages/moviecredit/schemas/form/MovieCreditForm.types.ts";
import {EntityOptionProps} from "@/common/type/components/EntityOptionProps.ts";
import MovieCreditDeleteWarningDialog from "@/pages/moviecredit/components/dialog/MovieCreditDeleteWarningDialog.tsx";

/**
 * Props for `MovieCreditOptions` component.
 *
 * Combines:
 * - {@link EntityOptionProps} for handling edit and delete actions
 * - Optional `children` to provide a custom trigger element for the popover
 */
type OptionsProps = EntityOptionProps<MovieCredit, MovieCredit, MovieCreditFormValues> & {
    /**
     * Optional custom trigger element for opening the options popover.
     * Defaults to a button with an ellipsis icon.
     */
    children?: ReactNode;
};

/**
 * A component that renders edit/delete options for a single movie credit.
 *
 * Features:
 * - Popover trigger button (customizable via `children`)
 * - Edit action via `MovieCreditSubmitFormPanel`
 * - Delete action via `MovieCreditDeleteWarningDialog`
 *
 * @example
 * ```tsx
 * <MovieCreditOptions
 *   entity={credit}
 *   onSubmit={{ onSubmitSuccess: handleUpdate }}
 *   onDelete={{ onDeleteSuccess: handleDelete }}
 * />
 * ```
 *
 * @param props - Configuration including entity, edit/delete handlers, and optional custom trigger.
 */
const MovieCreditOptions: FC<OptionsProps> = (props) => {
    const {children, onSubmit, onDelete, entity} = props;
    const {_id} = entity;

    return (
        <Popover>
            <PopoverTrigger asChild>
                {
                    children ??
                    <Button variant="outline" className="dark:hover:border dark:hover:border-gray-400">
                        <Ellipsis/>
                    </Button>
                }
            </PopoverTrigger>
            <PopoverContent className="w-40 flex flex-col p-0 dark:bg-dark">
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
