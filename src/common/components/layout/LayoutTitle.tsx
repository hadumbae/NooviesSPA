import {FC} from 'react';
import {cn} from "@/common/_feat/handle-ui/cn.ts";

type TitleProps = {
    text: string;
    className?: string;
}

const LayoutTitle: FC<TitleProps> = ({text, className}) => {
    return (
        <h1 className={cn(
            "font-dotGothic16 text-xl",
            "dark:text-white",
            className,
        )}>
            {text}
        </h1>
    );
};

export default LayoutTitle;
