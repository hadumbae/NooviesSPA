type ValidReturns<TTheatre, TScreens> = {
    data: { theatre: TTheatre, screens: TScreens };
    parseSuccess: true;
    parseError: null;
}

type InvalidReturns = {
    data: { theatre: null, screens: null };
    parseSuccess: false;
    parseError: Error | null;
}

export type FetchTheatreAndScreensReturns<TTheatre, TScreens> = {
    isPending: boolean;
    isError: boolean;
    queryError: Error | null;
} & (ValidReturns<TTheatre, TScreens> | InvalidReturns);