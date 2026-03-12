/**
 * @file Avatar component for displaying a person's profile image.
 * @filename PersonProfileAvatar.tsx
 */

import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import {URLString} from "@/common/schema/strings/URLStringSchema.ts";
import getInitials from "@/common/utility/formatters/getInitials.ts";

/**
 * Props for {@link PersonProfileAvatar}.
 */
type AvatarProps = {
    /** Person's display name used for initials fallback */
    name: string;

    /** Optional profile image URL */
    imageLink?: URLString;

    /** Optional CSS classes applied to the avatar */
    className?: string;
}

/**
 * Renders a person's avatar with an initials fallback.
 */
const PersonProfileAvatar = (
    {name, imageLink, className}: AvatarProps
) => {
    const initials = getInitials(name);

    return (
        <Avatar className={className}>
            <AvatarImage src={imageLink}/>
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    );
};

export default PersonProfileAvatar;