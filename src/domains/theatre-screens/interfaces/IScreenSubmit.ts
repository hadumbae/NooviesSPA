import {ScreenType} from "@/domains/theatre-screens/schema/model/ScreenTypeSchema.ts";

export interface IScreenSubmit{
    name: string,
    capacity: number | "",
    screenType?: ScreenType,
    theatre?: string,
}