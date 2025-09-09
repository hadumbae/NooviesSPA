import {Dispatch, FC, SetStateAction} from 'react';
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {X} from "lucide-react";

/**
 * Props for {@link RoleTypeFormCreatedList}.
 *
 * @property roleTypes - An array of {@link RoleType} objects that were recently created.
 * @property setRoleTypes - A state setter function for updating the list of created role types.
 */
type CreatedListProps = {
    roleTypes: RoleType[];
    setRoleTypes: Dispatch<SetStateAction<RoleType[]>>;
}

/**
 * A list component for displaying recently created {@link RoleType} entries.
 *
 * Each item shows the role name and provides a button to remove the entry from the list.
 *
 * @remarks
 * - Typically rendered inside {@link RoleTypeSubmitFormPanel} after successful form submissions.
 * - Uses a simple border + flex layout for readability.
 *
 * @example
 * ```tsx
 * const [roleTypes, setRoleTypes] = useState<RoleType[]>([]);
 *
 * <RoleTypeFormCreatedList
 *   roleTypes={roleTypes}
 *   setRoleTypes={setRoleTypes}
 * />
 * ```
 */
const RoleTypeFormCreatedList: FC<CreatedListProps> = ({roleTypes, setRoleTypes}) => {
    const removeRoleType = (_id: ObjectId) => setRoleTypes((prev) => prev.filter(rt => rt._id !== _id));

    return (
        <>{roleTypes.map(({_id, roleName}) => (
            <div key={_id} className="border rounded-lg p-2 flex justify-between items-center">
                <span>{roleName}</span>
                <Button
                    className="text-neutral-400 hover:text-black"
                    variant="link"
                    size="sm"
                    onClick={() => removeRoleType(_id)}
                    aria-label="Remove Role Type"
                >
                    <X/>
                </Button>
            </div>
        ))}</>
    );
};

export default RoleTypeFormCreatedList;
