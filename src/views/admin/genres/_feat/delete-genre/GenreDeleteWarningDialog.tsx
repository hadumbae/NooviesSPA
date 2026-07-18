/**
 * @fileoverview A warning dialog component for confirming the deletion of a genre.
 */

import {ReactElement, ReactNode} from 'react';
import {ObjectId} from "@/common/_schemas";
import {
    EntityDeleteWarningDialog
} from "@/views/common/_feat/dialog/EntityDeleteWarningDialog.tsx";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {UIOpenStateProps} from "@/common/_types";
import {useDeleteGenre} from "@/domains/genres";

/** Props for the {@link GenreDeleteWarningDialog} component. */
type DialogProps = UIOpenStateProps & {
    children?: ReactNode;
    _id: ObjectId;
    name: string;
    onSubmitConfig?: MutationResponseConfig<void, { _id: ObjectId }>;
};

/**
 * Renders a confirmation dialog that triggers the genre deletion mutation.
 */
export function GenreDeleteWarningDialog(
    {children, _id, name, isOpen, setIsOpen, onSubmitConfig}: DialogProps
): ReactElement {
    const {mutate} = useDeleteGenre(onSubmitConfig);

    return (
        <EntityDeleteWarningDialog
            title={`Proceed to delete "${name}"?`}
            deleteResource={() => mutate({_id})}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}