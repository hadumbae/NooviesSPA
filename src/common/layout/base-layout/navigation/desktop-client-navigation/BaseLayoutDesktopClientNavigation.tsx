import {FC} from 'react';
import NavLink from "@/common/components/navigation/NavLink.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useAuthLogoutSubmitMutation from "@/pages/auth/hooks/useAuthLogoutSubmitMutation.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

const BaseLayoutDesktopClientNavigation: FC = () => {
    const navigate = useLoggedNavigate();

    const onLogout = () => navigate({to: "/", component: BaseLayoutDesktopClientNavigation.name});
    const {mutate: logout} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    return (
        <section className="flex items-center">
            <SectionHeader srOnly={true}>Desktop Navigation</SectionHeader>

            <NavLink to="/">Home</NavLink>

            <Button
                variant="link"
                size="sm"
                className="text-neutral-400 hover:text-black"
                onClick={() => logout()}
            >
                Log Out
            </Button>
        </section>
    );
};

export default BaseLayoutDesktopClientNavigation;
