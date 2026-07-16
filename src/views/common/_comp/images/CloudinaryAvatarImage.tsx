/**
 * @fileoverview Avatar component that renders Cloudinary images or fallback initials.
 */

import {ReactElement} from 'react';
import type {CloudinaryImage} from "@/common/_schemas/cloudinary-image/CloudinaryImageSchema.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import getInitials from "@/common/utility/formatters/getInitials.ts";
import {cn} from "@/common/lib/utils.ts";

/** Props for the CloudinaryAvatarImage component. */
type AvatarProps = {
    personName: string;
    image?: CloudinaryImage | null;
    className?: string;
}

/**
 * Displays a user avatar using a Cloudinary image source with a fallback to name initials.
 */
export function CloudinaryAvatarImage(
    {image, personName, className}: AvatarProps
): ReactElement {
    return (
        <Avatar className={cn("h-24 w-24", className)}>
            <AvatarImage className="object-cover object-center" src={image?.secure_url}/>
            <AvatarFallback>{getInitials(personName)}</AvatarFallback>
        </Avatar>
    );
}
