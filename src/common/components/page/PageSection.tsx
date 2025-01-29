import {FC, PropsWithChildren} from 'react';
import HeaderSubtitle from "@/common/components/page/headers/HeaderSubtitle.tsx";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    className?: string;
    title?: string;
}

const PageSection: FC<PropsWithChildren<Props>> = ({children, className, title}) => {
    return (
        <section>
            {title && <HeaderSubtitle>{title}</HeaderSubtitle>}
            <div className={cn("space-y-3", className)}>
                {children}
            </div>
        </section>
    );
};

export default PageSection;
