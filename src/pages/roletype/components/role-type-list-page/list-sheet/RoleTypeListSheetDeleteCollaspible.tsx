/**
 * @file RoleTypeListSheetDeleteCollaspible.tsx
 * @description
 * A collapsible section used inside the Role Type list sheet for performing a delete action.
 * Expands to show a warning message, a confirmation button, and triggers a delete mutation.
 *
 * This component relies on:
 * - `useRoleTypeDeleteMutation` for performing server-side deletion.
 * - shadcn/ui `Collapsible` for UI interaction.
 * - Tailwind CSS class constants for consistent styling.
 */

import {FC, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ChevronDown, ChevronRight, TriangleAlert} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {SecondaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";
import useRoleTypeDeleteMutation from "@/pages/roletype/hooks/mutations/useRoleTypeDeleteMutation.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Props for {@link RoleTypeListSheetDeleteCollaspible}.
 *
 * @remarks
 * Extends `OnDeleteMutationParams`, which provides:
 * - Callbacks such as `onDeleteSuccess`
 * - Optional toast/notification handlers
 *
 * @property _id - The ID of the role type that will be deleted.
 */
export type CollaspibleProps = OnDeleteMutationParams & {
    _id: ObjectId;
};

/**
 * A collapsible UI block that allows the user to delete a Role Type.
 *
 * @remarks
 * When the section is opened, the user sees:
 * - A warning icon
 * - A description explaining the consequences
 * - A destructive “Delete” button
 *
 * After successful deletion:
 * - The collapsible closes
 * - `onDeleteSuccess` is called if provided
 *
 * @param props - {@link CollaspibleProps}
 *
 * @example
 * ```tsx
 * <RoleTypeListSheetDeleteCollaspible
 *   _id="abc123"
 *   onDeleteSuccess={() => refreshTable()}
 * />
 * ```
 *
 * @returns JSX.Element
 */
const RoleTypeListSheetDeleteCollaspible: FC<CollaspibleProps> = (props) => {
    const {_id, ...onDeleteProps} = props;
    const {onDeleteSuccess} = onDeleteProps;

    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    const onSuccess = () => {
        setDeleteOpen(false);
        onDeleteSuccess?.();
    };

    const {isPending, mutate} = useRoleTypeDeleteMutation({
        ...onDeleteProps,
        onDeleteSuccess: onSuccess,
    });

    return (
        <Collapsible open={deleteOpen} onOpenChange={setDeleteOpen}>
            <CollapsibleTrigger className={cn(PrimaryTextBaseCSS, "flex items-center space-x-2")}>
                {deleteOpen ? <ChevronDown/> : <ChevronRight/>}
                <h1 className="text-md font-bold">Delete Role Type</h1>
            </CollapsibleTrigger>

            <CollapsibleContent className="px-1">
                <div className="py-4 flex flex-col justify-between items-center space-y-3">
                    <TriangleAlert size={50} className="text-red-500"/>

                    <p className={cn(PrimaryTextBaseCSS, "text-justify")}>
                        Do you want to delete the role type? This will remove all
                        related data and cannot be reversed. Proceed?
                    </p>

                    <Button
                        variant="default"
                        className={cn(SecondaryButtonCSS, "w-full")}
                        onClick={() => mutate({_id})}
                        disabled={isPending}
                    >
                        Delete
                    </Button>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default RoleTypeListSheetDeleteCollaspible;
