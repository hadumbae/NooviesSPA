import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";

interface Props {
    className?: string;
}

const HeaderSubtitle: FC<PropsWithChildren<Props>> = ({children, className}) => {
    return (
        <h1 className={cn("text-lg", "font-bold", className)}>
            {children}
        </h1>
    );
};

export default HeaderSubtitle;
