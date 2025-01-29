import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {Link} from "react-router-dom";

interface Props {
    className?: string;
    to: string;
}

const HoverLink: FC<PropsWithChildren<Props>> = ({children, to, className}) => {
    return (
        <Link
            to={to}
            className={cn(
                "px-2",
                "py-1",
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

export default HoverLink;
