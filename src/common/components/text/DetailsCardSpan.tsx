/**
 * @fileoverview Component for displaying labelled text or links within a details card.
 */

import {ElementType, ReactElement} from 'react';
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {LoggerFunction} from "@/common/_feat/logger/Logger.types.ts";

/** Props for the DetailsCardSpan component. */
type SpanProps = {
    as?: ElementType;
    className?: string;
    label: string;
    text: string | number;
    to?: string | null;
    sourceComponent?: string;
    navMessage?: string;
}

/** Renders a labelled piece of information as either plain text or a logged link. */
export function DetailsCardSpan(
    {as: Component = "span", label, text, to, className, sourceComponent, navMessage}: SpanProps
): ReactElement {
    const linkProps = {
        level: "log" as LoggerFunction,
        component: sourceComponent,
        message: navMessage,
        target: "_blank",
    }

    return (
        <div className="flex flex-col space-y-0">
            <span className="secondary-text text-[12px] uppercase">{label}</span>

            <div className="primary-text">
                {
                    to ? (
                        <LoggedLink className={cn("font-bold hover:underline", className)} to={to}  {...linkProps}>
                            {text}
                        </LoggedLink>
                    ) : (
                        <Component className={cn("font-bold", className)}>
                            {text}
                        </Component>
                    )
                }
            </div>
        </div>
    );
}
