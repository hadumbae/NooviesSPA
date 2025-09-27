import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {To} from "react-router-dom";
import ButtonVariant from "@/common/type/ui/ButtonVariant.ts";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";

interface Props {
    to: To;
    message?: string
    variant?: ButtonVariant;
    className?: string;
    component?: string
}

const HeaderLink: FC<PropsWithChildren<Props>> = (props) => {
    const {children, to, message, component, variant = "outline", className = ""} = props

    return (
        <LoggedLink
            to={to}
            component={component}
            message={message}
            className={cn(
                buttonVariants({variant}),
                "text-neutral-400 hover:text-black p-2",
                className
            )}
        >
            {children}
        </LoggedLink>
    );
};

export default HeaderLink;
