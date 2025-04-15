export default interface IShowingSubmit {
    startTime: Date | string,
    endTime?: Date | string | null,
    ticketPrice: number | "",
    language: string,
    subtitleLanguages: string[],

    isSpecialEvent?: boolean,
    isActive?: boolean,

    movie?: string,
    theatre?: string,
    screen?: string,
}