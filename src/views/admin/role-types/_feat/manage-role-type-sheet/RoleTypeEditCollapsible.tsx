/**
 * @fileoverview Collapsible section providing an inline edit form for a RoleType.
 *
 */

import {RoleTypeSubmitFormActions, RoleTypeSubmitFormView} from "@/views/admin/role-types";
import {ReactElement, useState} from 'react';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/common/components/ui/collapsible.tsx";
import {ChevronDown, ChevronRight} from "lucide-react";
import {RoleTypeSubmitForm} from "@/views/admin/role-types/_feat/submit-form";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {RoleType} from "@/domains/roletype/schema/model/RoleTypeSchema.ts";

/** Props for the RoleTypeListSheetEditCollapsible component. */
type CollapsibleProps ={
    roleType: RoleType;
    onSubmitConfig?: MutationOnSubmitParams<RoleType>;
};

/**
 * Collapsible UI block that reveals an inline edit form for a specific RoleType.
 */
export function RoleTypeEditCollapsible(
    {roleType, onSubmitConfig = {}}: CollapsibleProps
): ReactElement {
    const {onSubmitSuccess} = onSubmitConfig;
    const [editOpen, setEditOpen] = useState<boolean>(false);

    const onEditSuccess = (roleType: RoleType) => {
        setEditOpen(false);
        onSubmitSuccess?.(roleType);
    };

    return (
        <Collapsible open={editOpen} onOpenChange={setEditOpen}>
            <CollapsibleTrigger className="primary-text flex items-center space-x-2">
                {editOpen ? <ChevronDown/> : <ChevronRight/>}
                <h1 className="text-md font-bold">Edit Role Type</h1>
            </CollapsibleTrigger>

            <CollapsibleContent className="px-1">
                <RoleTypeSubmitForm
                    formConfig={{editEntity: roleType}}
                    onSubmitConfig={{...onSubmitConfig, onSubmitSuccess: onEditSuccess}}
                >
                    <div className="space-y-3">
                        <RoleTypeSubmitFormView/>
                        <RoleTypeSubmitFormActions submitButtonText="Edit"/>
                    </div>
                </RoleTypeSubmitForm>
            </CollapsibleContent>
        </Collapsible>
    );
}
