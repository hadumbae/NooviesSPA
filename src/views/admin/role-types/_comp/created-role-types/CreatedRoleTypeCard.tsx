/**
 * @fileoverview Card component for displaying and removing a created role type.
 */

import {ReactElement} from "react";
import {RoleType} from "@/domains/roletypes";
import {Button} from "@/common/components/ui/button.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {X} from "lucide-react";

/** Props for the CreatedRoleTypeCard component. */
type CardProps = {
    roleType: RoleType;
    removeType: (_id: ObjectId) => void;
};

/**
 * Displays a role type name with a removal action button.
 */
export function CreatedRoleTypeCard(
    {roleType, removeType}: CardProps
): ReactElement {
    const {_id, roleName} = roleType;

    return (
        <div className="border rounded-lg p-2 flex justify-between items-center">
            <span>{roleName}</span>
            <Button
                className="text-neutral-400 hover:text-black"
                variant="link"
                size="sm"
                onClick={() => removeType(_id)}
                aria-label="Remove Role Type"
            >
                <X/>
            </Button>
        </div>
    );
}