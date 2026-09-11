/**
 * @fileoverview Collapsible section for deleting a Role Type within a list sheet.
 */

import {ReactElement, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/views/common/_comp/ui/collapsible.tsx";
import {ChevronDown, ChevronRight, TriangleAlert} from "lucide-react";
import {Button} from "@/views/common/_comp/ui/button.tsx";
import {ObjectId} from "@/common/_schemas";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {useRoleTypeDeleteMutation} from "@/domains/roletypes/_feat/crud-hooks/submit/useRoleTypeDeleteMutation.ts";
import {handleMutateAsync} from "@/common/_feat";

type DeleteByID = {
    _id: ObjectId
};

/** Props for the RoleTypeListSheetDeleteCollapsible component. */
export type CollapsibleProps = MutationResponseConfig<void, DeleteByID> & {
    _id: ObjectId;
};

/**
 * A collapsible UI block that triggers a destructive delete mutation for a Role Type.
 */
export function RoleTypeDeleteCollapsible(
    {_id, ...onSubmitConfig}: CollapsibleProps
): ReactElement {
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const {onSubmitSuccess} = onSubmitConfig;

    const onSuccess = () => {
        setDeleteOpen(false);
        onSubmitSuccess?.();
    };

    const {isPending, mutateAsync} = useRoleTypeDeleteMutation();

    const deleteRoleType = handleMutateAsync({
        ...onSubmitConfig,
        onSubmitSuccess: onSuccess,
        mutateAsync,
    });

    return (
        <Collapsible open={deleteOpen} onOpenChange={setDeleteOpen}>
            <CollapsibleTrigger className="primary-text flex items-center space-x-2">
                {deleteOpen ? <ChevronDown/> : <ChevronRight/>}
                <h1 className="text-md font-bold">Delete Role Type</h1>
            </CollapsibleTrigger>

            <CollapsibleContent className="px-1">
                <div className="py-4 flex flex-col justify-between items-center space-y-3">
                    <TriangleAlert size={50} className="text-red-500"/>

                    <p className="primary-text text-justify">
                        Do you want to delete the role type? This will remove all
                        related data and cannot be reversed. Proceed?
                    </p>

                    <Button
                        variant="default"
                        className="secondary-text w-full"
                        onClick={() => deleteRoleType({_id})}
                        disabled={isPending}
                    >
                        Delete
                    </Button>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
