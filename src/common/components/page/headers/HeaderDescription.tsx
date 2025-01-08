import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";

interface Props {
    className?: string;
}

const HeaderDescription: FC<PropsWithChildren<Props>> = ({children, className}) => {
    return (
        <span className={cn("text-neutral-500", "text-sm", "text-justify", className)}>
            {children}
        </span>
    );
};

export default HeaderDescription;
