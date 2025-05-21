import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import IMovie from "@/pages/movies/interfaces/IMovie.ts";
import IPerson from "@/pages/persons/interfaces/IPerson.ts";

export interface IMovieCredit {
    readonly _id: ObjectId;
    movie: ObjectId | IMovie;
    person: ObjectId | IPerson;
    roleType: "CAST" | "CREW";
    notes?: string;

    // Crew
    job?: string;

    // Cast
    characterName?: string;
    billingOrder?: number;

    // Boolean Flags
    uncredited?: boolean;
    voiceOnly?: boolean;
    cameo?: boolean;
    motionCapture?: boolean;
}