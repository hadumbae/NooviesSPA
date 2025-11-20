/**
 * @file RoleTypeListSheetEditCollaspible.tsx
 * @description
 * A collapsible section used inside the `RoleTypeListSheet` that provides an inline
 * edit form for a {@link RoleType}.
 *
 * When expanded, it displays a `RoleTypeSubmitFormContainer`.
 * On successful submission:
 * - the collapsible automatically closes, and
 * - the parent `onSubmitSuccess` callback (from mutation props) is fired.
 *
 * This keeps editing behavior consistent across sheets and list panels.
 */

import {FC, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ChevronDown, ChevronRight} from "lucide-react";
import RoleTypeSubmitFormContainer from "@/pages/roletype/components/forms/RoleTypeSubmitFormContainer.tsx";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for {@link RoleTypeListSheetEditCollaspible}.
 *
 * Extends {@link MutationOnSubmitParams} to support mutation handling
 * and carries the {@link RoleType} being edited.
 *
 * @property roleType - The entity whose values populate the edit form.
 */
type CollaspibleProps = MutationOnSubmitParams<RoleType> & {
    roleType: RoleType;
};

/**
 * `RoleTypeListSheetEditCollaspible`
 *
 * A collapsible UI block that reveals an edit form for a given {@link RoleType}.
 * The component handles:
 *
 * - Displaying a toggleable header ("Edit Role Type").
 * - Rendering an inline edit form when expanded.
 * - Closing the collapsible on successful submission.
 * - Propagating the successful result to the parent component.
 *
 * @param props - {@link CollaspibleProps} including the entity and mutation callbacks.
 *
 * @example
 * ```tsx
 * <RoleTypeListSheetEditCollaspible
 *   roleType={role}
 *   onSubmitSuccess={(updated) => console.log("Updated:", updated)}
 * />
 * ```
 *
 * @returns A collapsible wrapper enabling inline editing of a role type.
 */
const RoleTypeListSheetEditCollaspible: FC<CollaspibleProps> = (props) => {
    const {roleType, ...mutationProps} = props;
    const {onSubmitSuccess} = mutationProps;

    /** Tracks whether the edit section is expanded. */
    const [editOpen, setEditOpen] = useState<boolean>(false);

    /**
     * Closes the collapsible and forwards the success result.
     */
    const onEditSuccess = (roleType: RoleType) => {
        setEditOpen(false);
        onSubmitSuccess?.(roleType);
    };

    return (
        <Collapsible open={editOpen} onOpenChange={setEditOpen}>
            <CollapsibleTrigger className={cn(PrimaryTextBaseCSS, "flex items-center space-x-2")}>
                {editOpen ? <ChevronDown/> : <ChevronRight/>}
                <h1 className="text-md font-bold">Edit Role Type</h1>
            </CollapsibleTrigger>

            <CollapsibleContent className="px-1">
                <RoleTypeSubmitFormContainer
                    className="py-4"
                    onSubmitSuccess={onEditSuccess}
                    isEditing={true}
                    entity={roleType}
                />
            </CollapsibleContent>
        </Collapsible>
    );
};

export default RoleTypeListSheetEditCollaspible;
