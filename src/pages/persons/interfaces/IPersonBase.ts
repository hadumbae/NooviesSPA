import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ISO3166Alpha2CountryCode} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";

/**
 * Represents the base structure for a person entity, such as an actor, director, or public figure.
 */
export default interface IPersonBase {
    /**
     * The unique identifier of the person.
     */
    readonly _id: ObjectId;

    /**
     * The full name of the person.
     */
    name: string;

    /**
     * A descriptive biography or background information about the person.
     */
    biography: string;

    /**
     * The person's date of birth.
     */
    dob: string;

    /**
     * The nationality or country of origin of the person.
     */
    nationality: ISO3166Alpha2CountryCode;

    /**
     * The person's profile image, typically stored via Cloudinary.
     * May be `null` or undefined if no image is set.
     */
    profileImage?: ICloudinaryImage | null;
}