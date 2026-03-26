/**
 * @file Reusable secondary heading component for page or section subtitles.
 * @filename HeaderSubtitle.tsx
 */

import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the {@link HeaderSubtitle} component.
 */
type SubtitleProps = {
    /**
     * Additional CSS class names for fine-tuning margins, colors, or alignment.
     */
    className?: string;
};

/**
 * Renders a semantic `h2` subtitle with a refined, secondary typographic treatment.
 */
const HeaderSubtitle: FC<PropsWithChildren<SubtitleProps>> = ({children, className}) => {
    return (
        <h2 className={cn(
            SecondaryTextBaseCSS,
            "font-light italic text-xs xl:text-sm",
            className,
        )}>
            {children}
        </h2>
    );
};

export default HeaderSubtitle;