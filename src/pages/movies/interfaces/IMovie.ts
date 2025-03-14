import {ObjectId} from "@/common/schema/helpers/ZodStringHelpers.ts";
import IPerson from "@/pages/persons/interfaces/IPerson.ts";
import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";
import IGenre from "@/pages/genres/interfaces/IGenre.ts";

export default interface IMovie {
    readonly _id: ObjectId,
    title: string,
    description: string,
    genres: (ObjectId | IGenre)[],
    directors: (ObjectId | IPerson)[],
    cast: (ObjectId | IPerson)[],
    releaseDate: Date,
    durationInMinutes: number,
    languages: string[],
    subtitles: string[],
    posterImage: ICloudinaryImage | null,
    trailerURL?: string | null,
    price: number,
    showings: (ObjectId | any)[],
}

