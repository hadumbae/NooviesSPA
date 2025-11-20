import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Plus} from "lucide-react";
import RoleTypeSubmitFormPanel from "@/pages/roletype/components/forms/form-panel/RoleTypeSubmitFormPanel.tsx";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";

/**
 * Props for {@link RoleTypeListHeader}.
 *
 * This header component accepts {@link MutationOnSubmitParams} for consistency
 * with other list headers in the application, even though no props are
 * currently consumed directly.
 *
 * @remarks
 * The mutation params are passed implicitly down to nested form panels
 * via React context or container-level patterns, aligning with other page headers
 * that allow new-item creation.
 *
 * @example
 * ```tsx
 * <RoleTypeListHeader
 *   onSubmitSuccess={(roleType) => console.log("RoleType created:", roleType)}
 *   successMessage="RoleType created successfully!"
 * />
 * ```
 */
type HeaderProps = MutationOnSubmitParams<RoleType>;

/**
 * **RoleTypeListHeader**
 *
 * Page header for the Role Type list page.
 *
 * Responsibilities:
 * - Displays the page title and short description.
 * - Provides a "Create" button that triggers a {@link RoleTypeSubmitFormPanel}.
 *
 * The form panel:
 * - Opens as a panel-style modal.
 * - Uses `closeOnSubmit={false}` to keep the panel open after creation (useful for multi-entry workflows).
 *
 * ---
 *
 * @component
 *
 * @returns JSX element representing the header section for the Role Types page.
 *
 * @example
 * ```tsx
 * <RoleTypeListHeader />
 * ```
 */
const RoleTypeListHeader: FC<HeaderProps> = () => {
    return (
        <header className="flex items-center justify-between">
            <section>
                <HeaderTitle>Role Types</HeaderTitle>
                <HeaderDescription>Create And Update Role Types Here.</HeaderDescription>
            </section>

            <section>
                <RoleTypeSubmitFormPanel closeOnSubmit={false}>
                    <Button variant="link" size="sm" className={HoverLinkCSS}>
                        <Plus /> Create
                    </Button>
                </RoleTypeSubmitFormPanel>
            </section>
        </header>
    );
};

export default RoleTypeListHeader;
