import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";

type TitleProps = {
    text: string;
    className?: string;
}

const LayoutTitle: FC<TitleProps> = ({text, className}) => {
    return (
        <h1 className={cn(
            "dotgothic16-regular text-xl",
            "dark:text-white",
            className,
        )}>
            {text}
        </h1>
    );
};

export default LayoutTitle;
