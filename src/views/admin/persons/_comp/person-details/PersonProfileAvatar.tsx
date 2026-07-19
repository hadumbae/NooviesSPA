/**
 * @fileoverview Avatar component for displaying a person's profile image with initials fallback.
 */

import {ReactElement} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/views/common/_comp/ui";
import {URLString} from "@/common/_schemas/strings/simple-strings/URLStringSchema.ts";
import {getInitials} from "@/common/_feat/formatters/getInitials.ts";

/**
 * Props for the PersonProfileAvatar component.
 */
type AvatarProps = {
    name: string;
    imageLink?: URLString;
    className?: string;
}

/**
 * Renders a profile image for a person.
 */
export function PersonProfileAvatar({name, imageLink, className}: AvatarProps): ReactElement {
    const initials = getInitials(name);

    return (
        <Avatar className={className}>
            <AvatarImage src={imageLink}/>
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    );
}