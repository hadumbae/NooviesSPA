/**
 * @fileoverview A navigation link component that applies hoverable icon-text button styling and logging.
 */

import {forwardRef} from 'react';
import {cn} from "@/common/lib/utils.ts";
import LoggedLink, {LoggedLinkProps} from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/** Renders a LoggedLink with pre-applied hoverable icon-text button styles. */
const LoggedHoverLink = forwardRef<HTMLAnchorElement, LoggedLinkProps>((props, ref) => {
    const {className, ...linkProps} = props;

    return (
        <LoggedLink ref={ref} {...linkProps} className={cn(
            "text-with-icon link-button",
            className
        )}/>
    );
});

export default LoggedHoverLink;
