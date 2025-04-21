import {FC} from 'react';
import {Sidebar, SidebarContent, SidebarHeader} from "@/common/components/ui/sidebar.tsx";
import ClientProfileSidebarGroup from "@/common/components/sidebar/client/ClientProfileSidebarGroup.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";

const ClientSidebar: FC = () => {
    return (
        <Sidebar>
            <SidebarHeader className="flex justify-center items-center">
                <h1 className="text-3xl font-playwriteRoCursive">Noovies</h1>
            </SidebarHeader>

            <SidebarContent>
                <section>
                    <Separator />
                    <ClientProfileSidebarGroup />
                </section>

                <section>
                    <Separator />
                </section>

            </SidebarContent>
        </Sidebar>
    );
};

export default ClientSidebar;
