/**
 * @fileoverview A confirmation dialog for removing an image from a genre entity.
 */

import {ReactElement, ReactNode} from "react";
import {MutationResponseConfig} from "@/common/features/submit-data";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {UIOpenStateProps} from "@/common/types";
import {useRemoveGenreImage} from "@/domains/genres/_feat/manage-image";
import {Genre} from "@/domains/genres/schema";

/** Props for the RemoveGenreImageWarningDialog component. */
type DialogProps = MutationResponseConfig<Genre> & UIOpenStateProps & {
    children?: ReactNode;
    _id: ObjectId;
    name: string;
};

/**
 * Displays a warning dialog to confirm the deletion of a genre image.
 */
export function RemoveGenreImageWarningDialog(
    {children, _id, name, isOpen, setIsOpen, ...onSubmit}: DialogProps
): ReactElement {
    const {mutate} = useRemoveGenreImage(onSubmit);

    return (
        <EntityDeleteWarningDialog
            title={`Remove Image From "${name}"?`}
            deleteResource={() => mutate({_id})}
            presetOpen={isOpen}
            setPresetOpen={setIsOpen}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}