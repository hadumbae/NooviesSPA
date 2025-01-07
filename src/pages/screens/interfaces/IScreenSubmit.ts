import {ScreenType} from "@/pages/screens/schema/ScreenTypeEnum.ts";

export interface IScreenSubmit{
    name: string,
    capacity: number | "",
    screenType?: ScreenType,
    theatre?: string,
}