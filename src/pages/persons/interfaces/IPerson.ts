import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export default interface IPerson {
    readonly _id: ObjectId,
    name: string,
    biography: string,
    dob: Date,
    nationality: string,
    profileImage?: ICloudinaryImage | null,
    movies: (ObjectId | any)[],
}