import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";

const LayoutBreakpointIndicator: FC = () => {
    const darkCSS = "dark:text-white";

    return (
        <>
            <span className={cn("sm:hidden", darkCSS)}>Is XS</span>
            <span className={cn("max-sm:hidden md:hidden", darkCSS)}>Is SM</span>
            <span className={cn("max-md:hidden lg:hidden", darkCSS)}>Is MD</span>
            <span className={cn("max-lg:hidden xl:hidden", darkCSS)}>Is LG</span>
            <span className={cn("max-xl:hidden 2xl:hidden", darkCSS)}>Is XL</span>
            <span className={cn("max-2xl:hidden", darkCSS)}>Is 2XL</span>
        </>
    );
};

export default LayoutBreakpointIndicator;
