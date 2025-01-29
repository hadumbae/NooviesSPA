import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";

interface Props {
    className?: string;
}

const TextQuote: FC<PropsWithChildren<Props>> = ({children, className}) => {
    return (
        <blockquote className={cn(
            "text-sm",
            "text-neutral-500",
            "border-l-4",
            "px-4",
            "text-justify",
            className,
        )}>
            {children}
        </blockquote>
    );
};

export default TextQuote;
