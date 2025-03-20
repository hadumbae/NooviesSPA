import {FC, PropsWithChildren, useState} from 'react';
import {cn} from "@/common/lib/utils.ts";

interface Props {
    className?: string;
}

const LineClampedTextblock: FC<PropsWithChildren<Props>> = ({children, className}) => {
    const [hideState, setHideState] = useState(true);

    return (
        <div className="relative">
            <div
                onClick={() => setHideState(false)}
                className={cn(
                    "text-justify",
                    hideState && "line-clamp-3 cursor-pointer",
                    className
                )}>
                {children}
            </div>

            {
                hideState &&
                <div className={cn(
                    "absolute bottom-0 left-0",
                    "w-full h-12 ",
                    "bg-gradient-to-b from-transparent to-neutral-100",
                    "pointer-events-none",
                )} />
            }
        </div>
    );
};

export default LineClampedTextblock;
