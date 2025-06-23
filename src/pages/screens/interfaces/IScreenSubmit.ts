import {ScreenType} from "@/pages/screens/schema/ScreenType.enum.ts";

export interface IScreenSubmit{
    name: string,
    capacity: number | "",
    screenType?: ScreenType,
    theatre?: string,
}