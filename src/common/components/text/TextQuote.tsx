import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {QuoteTextCSS} from "@/common/constants/css/TextCSS.ts";

interface Props {
    className?: string;
}

const TextQuote: FC<PropsWithChildren<Props>> = ({children, className}) => {
    return (
        <blockquote className={cn(
            QuoteTextCSS,
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
