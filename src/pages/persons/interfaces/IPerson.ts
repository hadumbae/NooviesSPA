import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";

export default interface IPerson {
    readonly _id: ObjectId,
    name: string,
    biography: string,
    dob: Date,
    nationality: string,
    profileImage?: ICloudinaryImage | null,
    movies: (ObjectId | any)[],
}