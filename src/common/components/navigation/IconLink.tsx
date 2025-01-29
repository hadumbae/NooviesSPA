import {FC, PropsWithChildren, ReactElement} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {Link} from "react-router-dom";

interface Props {
    className?: string;
    to: string;
    icon: ReactElement,
}

const IconLink: FC<PropsWithChildren<Props>> = ({children, to, className}) => {
    return (
        <Link
            to={to}
            className={cn(
                "text-neutral-400",
                "hover:text-black",
                "hover:underline",
                "hover:underline-offset-8",
                className
            )}
        >
            {children}
        </Link>
    );
};

export default IconLink;
