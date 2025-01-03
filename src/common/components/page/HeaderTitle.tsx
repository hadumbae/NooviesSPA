import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";

interface Props {
    className?: string;
}

const HeaderTitle: FC<PropsWithChildren<Props>> = ({children, className}) => {
    return (
        <h1 className={cn("text-2xl", "font-bold", className)}>
            {children}
        </h1>
    );
};

export default HeaderTitle;
