import IPerson from "@/pages/persons/interfaces/IPerson.ts";
import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";
import IGenre from "@/pages/genres/interfaces/IGenre.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

export default interface IMovie {
    readonly _id: ObjectId,
    title: string,
    originalTitle: string,
    tagline?: string,
    country: string,
    synopsis: string,
    genres: (ObjectId | IGenre)[],
    staff: (ObjectId | IPerson)[],
    cast: (ObjectId | IPerson)[],
    releaseDate: string,
    runtime: number,
    originalLanguage: string,
    languages: string[],
    subtitles: string[],
    posterImage: ICloudinaryImage | null,
    trailerURL?: string | null,
    showings: (ObjectId | any)[],
}

