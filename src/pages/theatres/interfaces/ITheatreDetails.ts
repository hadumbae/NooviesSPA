import ITheatre from "@/pages/theatres/interfaces/ITheatre.ts";

export default interface ITheatreDetails extends ITheatre {
    screenCount: number;
    seatCount: number;
    futureShowingCount: number;
}