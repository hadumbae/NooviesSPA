import {FC} from 'react';
import type {CloudinaryImageObject} from "@/common/schema/objects/CloudinaryImageObjectSchema.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/common/components/ui/avatar.tsx";
import getInitials from "@/common/utility/getInitials.ts";

type AvatarProps = {
    personName: string;
    image?: CloudinaryImageObject | null;
}

const CloudinaryAvatarImage: FC<AvatarProps> = ({image, personName}) => {
    return (
        <Avatar className="h-24 w-24">
            <AvatarImage className="object-cover object-center" src={image?.secure_url}/>
            <AvatarFallback>{getInitials(personName)}</AvatarFallback>
        </Avatar>
    )
};

export default CloudinaryAvatarImage;
