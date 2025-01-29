import {FC} from 'react';
import ThreeDotsLoader from "@/common/components/loaders/ThreeDotsLoader.tsx";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    className?: string;
}

const PageLoader: FC<Props> = ({className = ""}) => {
    return (
        <div className={cn(
            "w-full",
            "h-full",
            "flex",
            "justify-center",
            "items-center",
            className,
        )}>
            <ThreeDotsLoader />
        </div>
    );
};

export default PageLoader;
