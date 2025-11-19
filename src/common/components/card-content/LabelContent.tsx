import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

interface StylingProps {
    label?: string;
    container?: string;
    content?: string;
}

interface LabelProps {
    orientation?: "horizontal" | "vertical";
    classNames?: StylingProps;
    label: string;
}

const LabelContent: FC<PropsWithChildren<LabelProps>> = (props) => {
    const {children, orientation = "vertical", classNames = {}, label} = props;
    const {label: labelClassName, container: containerClassName, content: contentClassName} = classNames;

    const containerCSS = orientation === "horizontal" ? "grid grid-cols-3 gap-2 items-center" : "flex flex-col space-y-3";
    const contentCSS = orientation === "horizontal" && "col-span-2";

    return (
        <div className={cn(containerCSS, containerClassName)}>
            {
                label &&
                <div>
                    <span className={cn(
                        "uppercase text-[12px] select-none",
                        SecondaryTextBaseCSS,
                        labelClassName,
                    )}>
                        {label}
                    </span>
                </div>
            }

            <div className={cn(contentCSS, contentClassName)}>
                {children}
            </div>
        </div>
    );
};

export default LabelContent;
