/**
 * @fileoverview Header component for the Role Type management list page.
 *
 */

import {ReactElement} from 'react';
import {Plus} from "lucide-react";
import {Button} from "@/common/components/ui";
import {HeaderDescription, HeaderTitle} from "@/views/common/_comp/page-headers";
import {RoleTypeSubmitFormPanel} from "@/views/admin/role-types/_feat/submit-form/RoleTypeSubmitFormPanel.tsx";

/** Header for the Role Type list page containing the title and creation trigger. */
export function RoleTypeListHeader(): ReactElement {
    return (
        <header className="flex items-center justify-between">
            <div>
                <HeaderTitle>Role Types</HeaderTitle>
                <HeaderDescription>Create And Update Role Types Here.</HeaderDescription>
            </div>

            <RoleTypeSubmitFormPanel onSubmitConfig={{successMessage: "Created."}}>
                <Button variant="link" size="sm" className="link-button">
                    <Plus/> Create
                </Button>
            </RoleTypeSubmitFormPanel>
        </header>
    );
}
