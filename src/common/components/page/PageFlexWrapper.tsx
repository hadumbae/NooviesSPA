import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";

interface Props {
    className?: string;
}

const PageFlexWrapper: FC<PropsWithChildren<Props>> = ({children, className}) => {
    return (
        <section className={cn(
            "h-full flex flex-col space-y-5",
            className,
        )}>
            {children}
        </section>
    );
};

export default PageFlexWrapper;
