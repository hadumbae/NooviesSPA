/**
 * @fileoverview A list component for displaying and managing recently created RoleType entries.
 */

import {Dispatch, ReactElement, SetStateAction} from 'react';
import {ObjectId} from "@/common/_schemas";
import {RoleType} from "@/domains/roletypes/_schema/model/RoleTypeSchema.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {X} from "lucide-react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {CreatedRoleTypeCard} from "@/views/admin/role-types/_comp/created-role-types/CreatedRoleTypeCard.tsx";

type ListStyling = {
    container?: string;
    items?: string;
}

/** Props for the RoleTypeFormCreatedList component. */
type CreatedListProps = {
    roleTypes: RoleType[];
    setRoleTypes: Dispatch<SetStateAction<RoleType[]>>;
    classNames?: ListStyling;
}

/** Displays a list of created role types with an option to remove them from the view. */
export function CreatedRoleTypeList(
    {roleTypes, setRoleTypes, classNames}: CreatedListProps
): ReactElement {
    const removeRoleType = (_id: ObjectId) => setRoleTypes((prev) => prev.filter(rt => rt._id !== _id));

    return (
        <div className={cn("space-y-2", classNames?.container)}>
            <div className="flex justify-between items-center">
                <h2 className="primary-text text-md font-bold">
                    Created Role Types
                </h2>
                <Button
                    className="text-neutral-400 hover:text-black"
                    variant="link"
                    size="sm"
                    onClick={() => setRoleTypes([])}
                >
                    <X/> Clear
                </Button>
            </div>

            <div className={cn("space-y-2", classNames?.items)}>
                {roleTypes.map((roleType) => (
                    <CreatedRoleTypeCard
                        key={roleType._id}
                        roleType={roleType}
                        removeType={removeRoleType}
                    />
                ))}
            </div>
        </div>
    );
}
