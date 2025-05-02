export default interface IMovieSubmit {
    title: string,
    description: string,
    genres: string[],
    directors: string[],
    cast: string[],
    releaseDate: string,
    durationInMinutes: number | "",
    languages?: string[],
    subtitles?: string[],
    trailerURL?: string | null,
    price: number | "",
}