import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";

interface Props {
    className?: string;
}

const PageCenter: FC<PropsWithChildren<Props>> = ({children, className}) => {
    return (
        <div className={cn(
            'h-full',
            'flex',
            'flex-col',
            'justify-center',
            'items-center',
            className,
        )}>
            {children}
        </div>
    );
};

export default PageCenter;
