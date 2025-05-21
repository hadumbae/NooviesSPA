import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";
import IGenre from "@/pages/genres/interfaces/IGenre.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {IMovieCredit} from "@/pages/moviecredit/interfaces/IMovieCredit.ts";

export default interface IMovie {
    readonly _id: ObjectId,
    title: string,
    originalTitle: string,
    tagline?: string,
    country: string,
    synopsis: string,
    genres: (ObjectId | IGenre)[],
    crew?: (ObjectId | IMovieCredit)[],
    cast?: (ObjectId | IMovieCredit)[],
    releaseDate: string,
    runtime: number,
    originalLanguage: string,
    languages: string[],
    subtitles: string[],
    posterImage?: ICloudinaryImage | null,
    trailerURL?: string | null,
    showings: (ObjectId | any)[],
}

