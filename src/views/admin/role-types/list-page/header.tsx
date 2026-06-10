/**
 * @fileoverview Header component for the Role Type management list page.
 *
 */

import {ReactElement} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {RoleTypeSubmitFormPanel} from "@/views/admin/role-types/_feat/submit-form/RoleTypeSubmitFormPanel.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";

/** Header for the Role Type list page containing the title and creation trigger. */
export function RoleTypeListHeader(): ReactElement {
    return (
        <header className="flex items-center justify-between">
            <div>
                <HeaderTitle>Role Types</HeaderTitle>
                <HeaderDescription>Create And Update Role Types Here.</HeaderDescription>
            </div>

            <RoleTypeSubmitFormPanel onSubmitConfig={{successMessage: "Created."}}>
                <Button variant="link" size="sm" className={HoverLinkCSS}>
                    <Plus/> Create
                </Button>
            </RoleTypeSubmitFormPanel>
        </header>
    );
}
