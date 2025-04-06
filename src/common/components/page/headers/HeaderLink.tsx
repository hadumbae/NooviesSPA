import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Link} from "react-router-dom";
import ButtonVariant from "@/common/type/ui/ButtonVariant.ts";

interface Props {
    variant?: ButtonVariant;
    className?: string;
    to: string;
}

const HeaderLink: FC<PropsWithChildren<Props>> = ({children, variant = "outline", to, className = ""}) => {
    return (
        <Link
            to={to}
            className={cn(
                buttonVariants({variant}),
                "text-neutral-400 hover:text-black p-2",
                className
            )}
        >
            {children}
        </Link>
    );
};

export default HeaderLink;
