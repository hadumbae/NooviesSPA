/**
 * @fileoverview A navigation link component that applies hoverable icon-text button styling and logging.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/_feat";
import {Link, LinkProps} from "react-router-dom";

/** Renders a LoggedLink with pre-applied hoverable icon-text button styles. */
export function HoverLink({className, ...linkProps}: LinkProps): ReactElement {
    return (
        <Link
            className={cn("text-with-icon link-button", className)}
            {...linkProps}
        />
    );
}


