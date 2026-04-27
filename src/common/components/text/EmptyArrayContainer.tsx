/** @fileoverview Presentational component for displaying an empty-state message. */

import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/** Props for the EmptyArrayContainer component. */
type ContainerProps = {
    text?: string;
    className?: string;
};

/** Renders a centered, stylized message indicating an empty collection state. */
const EmptyArrayContainer = ({text, className}: ContainerProps) => {
    return (
        <div className={cn("flex justify-center items-center", className)}>
            <span
                className={cn(
                    "uppercase italic select-none text-sm",
                    SecondaryTextBaseCSS
                )}
            >
                {text ?? "There Are No Items"}
            </span>
        </div>
    );
};

export default EmptyArrayContainer;