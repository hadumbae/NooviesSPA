import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {Plus} from "lucide-react";
import RoleTypeSubmitFormPanel from "@/pages/roletype/components/forms/form-panel/RoleTypeSubmitFormPanel.tsx";

const RoleTypeListHeader: FC = () => {
    return (
        <header className="flex items-center justify-between">
            <section>
                <HeaderTitle>Role Types</HeaderTitle>
                <HeaderDescription>Create And Update Role Types Here.</HeaderDescription>
            </section>

            <section>
                <RoleTypeSubmitFormPanel closeOnSubmit={false}>
                    <Button variant="link" className="text-neutral-400 hover:text-black">
                        <Plus/> Create
                    </Button>
                </RoleTypeSubmitFormPanel>
            </section>
        </header>
    );
};

export default RoleTypeListHeader;
