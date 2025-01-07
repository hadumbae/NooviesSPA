import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Link} from "react-router-dom";

interface Props {
    className?: string;
    to: string;
}

const HeaderLink: FC<PropsWithChildren<Props>> = ({children, to, className = ""}) => {
    return (
        <Link
            className={cn(buttonVariants({variant: "outline"}), "p-2", className)}
            to={to}
        >
            {children}
        </Link>
    );
};

export default HeaderLink;
