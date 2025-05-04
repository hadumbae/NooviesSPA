import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";

interface Props {
    text: string;
    className?: string;
}

const LayoutTitle: FC<Props> = ({text, className}) => {
    return (
        <h1 className={cn("dotgothic16-regular text-xl", className)}>
            {text}
        </h1>
    );
};

export default LayoutTitle;
