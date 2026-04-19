/**
 * @fileoverview Avatar component for displaying a person's profile image with initials fallback.
 */

import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import {URLString} from "@/common/schema/strings/URLStringSchema.ts";
import getInitials from "@/common/utility/formatters/getInitials.ts";
import {ReactElement} from "react";

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