/**
 * @fileoverview User details page section component for granting or revoking administrative roles for a user.
 */

import {ReactElement, useState} from "react";
import {ObjectId} from "@/common/_schemas";
import {Button} from "@/views/common/_comp/ui";
import {PageSectionHeader} from "@/views/common/_comp";
import {UserRole, UserStatus} from "@/domains/users/_schema/fields";
import {useInvalidateUserQueriesOnModeration} from "@/domains/users/_feat/user-moderation-actions";
import {UpdateUserAdminRoleForm} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/forms";
import {GenericFormDialog} from "@/views/common/_feat";
import {UpdateUserAdminRoleFormView} from "@/views/admin/users/_feat/update-user-admin-role-form";
import {
    UpdateUserAdminRoleFormValues,
    UpdateUserAdminRoleReturns
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/schema";

/** Props for the UserDetailsPageRoleManagementSection component. */
type SectionProps = {
    userId: ObjectId;
    userRoles: UserRole[];
    userStatus: UserStatus;
};

/**
 * Renders the role management section on the user details page, allowing administrators to grant or revoke admin permissions.
 */
export function UserDetailsPageRoleManagementSection(
    {userId, userStatus, userRoles}: SectionProps
): ReactElement {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(userRoles.includes("ADMIN"));
    const invalidateQueries = useInvalidateUserQueriesOnModeration();

    const filteredRoles = userRoles.filter(r => r !== "ADMIN");
    const [actionVerb, actionPrep] = !isAdmin
        ? ["Grant", "to"]
        : ["Revoke", "from"];

    const grantValues: UpdateUserAdminRoleFormValues = {
        action: "user_role_grant_admin",
        roles: [...filteredRoles, "ADMIN"],
        message: "",
    }

    const revokeValues: UpdateUserAdminRoleFormValues = {
        action: "user_role_revoke_admin",
        roles: filteredRoles,
        message: "",
    }

    const onUpdateSubmit = () => setIsUpdating(false);
    const onUserRoleUpdate = ({user}: UpdateUserAdminRoleReturns) => {
        setIsAdmin(user.roles.includes("ADMIN"));
        invalidateQueries();
    }

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Roles"/>

            <UpdateUserAdminRoleForm
                mutConfig={{userId}}
                onSubmit={onUpdateSubmit}
                onSubmitSuccess={onUserRoleUpdate}
                presetValues={isAdmin ? revokeValues : grantValues}
                resetValues={isAdmin ? grantValues : revokeValues}
                resetOnSuccess={true}
            >
                <GenericFormDialog
                    isOpen={isUpdating}
                    setIsOpen={setIsUpdating}
                    title={`${actionVerb} Admin Role`}
                    description={`${actionVerb} the admin role ${actionPrep} the specified user.`}
                    submitText={`${actionVerb} Role`}
                    trigger={(
                        <Button variant="primary" className="w-full py-12" disabled={userStatus === "INACTIVE"}>
                            {userStatus === "INACTIVE" ? "Inactive User" : `${actionVerb} Admin Role`}
                        </Button>
                    )}
                >
                    <UpdateUserAdminRoleFormView/>
                </GenericFormDialog>
            </UpdateUserAdminRoleForm>
        </section>
    );
}