/**
 * @fileoverview User details page section component for granting or revoking administrative roles for a user.
 */

import {ReactElement, useState} from "react";
import {ObjectId} from "@/common/_schemas";
import {PageSectionHeader} from "@/views/common/_comp";
import {GenericFormDialog} from "@/views/common/_feat";
import {Button} from "@/views/common/_comp/ui";
import {UserRole} from "@/domains/users/_schema/fields";
import {UpdateUserAdminRoleReturns} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/schema";
import {useInvalidateUserQueriesOnModeration} from "@/domains/users/_feat/user-moderation-actions";
import {UpdateUserAdminRoleFormView} from "@/views/admin/users/_feat/update-user-admin-role-form";
import {
    GrantUserAdminRoleForm,
    RevokeUserAdminRoleForm,
} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/forms";

/** Props for the UserDetailsPageRoleManagementSection component. */
type SectionProps = {
    userId: ObjectId;
    roles: UserRole[];
};

/**
 * Renders the role management section on the user details page, allowing administrators to grant or revoke admin permissions.
 */
export function UserDetailsPageRoleManagementSection(
    {userId, roles}: SectionProps
): ReactElement {
    const filteredRoles = roles.filter(r => r !== "ADMIN");
    const [isAdmin, setIsAdmin] = useState<boolean>(roles.includes("ADMIN"));

    const [isRevoking, setIsRevoking] = useState<boolean>(false);
    const [isGranting, setIsGranting] = useState<boolean>(false);

    const invalidateQueries = useInvalidateUserQueriesOnModeration();

    const onUserRoleUpdate = ({user}: UpdateUserAdminRoleReturns) => {
        setIsAdmin(user.roles.includes("ADMIN"));
        invalidateQueries();
    }

    const onUpdateSubmit = () => {
        setIsRevoking(false);
        setIsGranting(false);
    }

    return (
        <section className="space-y-4">
            <PageSectionHeader text="Roles"/>

            {
                isAdmin ? (
                    <RevokeUserAdminRoleForm
                        mutConfig={{userId}}
                        onSubmit={onUpdateSubmit}
                        onSubmitSuccess={onUserRoleUpdate}
                        presetValues={{
                            roles: filteredRoles,
                            action: "user_role_revoke_admin",
                        }}
                    >
                        <GenericFormDialog
                            isOpen={isRevoking}
                            setIsOpen={setIsRevoking}
                            title="Revoke Admin Role"
                            description="Revoke the admin role of the specified user."
                            submitText="Revoke Role"
                            trigger={(
                                <Button variant="secondary" className="w-full py-12">
                                    Revoke Admin Role
                                </Button>
                            )}
                        >
                            <UpdateUserAdminRoleFormView/>
                        </GenericFormDialog>
                    </RevokeUserAdminRoleForm>
                ) : (
                    <GrantUserAdminRoleForm
                        mutConfig={{userId}}
                        onSubmit={onUpdateSubmit}
                        onSubmitSuccess={onUserRoleUpdate}
                        presetValues={{
                            roles: [...filteredRoles, "ADMIN"],
                            action: "user_role_grant_admin",
                        }}
                    >
                        <GenericFormDialog
                            isOpen={isGranting}
                            setIsOpen={setIsGranting}
                            title="Grant Admin Role"
                            description="Grant the admin role to the specified user."
                            submitText="Grant Role"
                            trigger={(
                                <Button variant="primary" className="w-full py-12">
                                    Grant Admin Role
                                </Button>
                            )}
                        >
                            <UpdateUserAdminRoleFormView/>
                        </GenericFormDialog>
                    </GrantUserAdminRoleForm>
                )
            }
        </section>
    );
}