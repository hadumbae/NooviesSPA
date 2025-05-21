import {z} from 'zod';
import LanguageConstant from "@/common/constants/LanguageConstant.ts";

export const LanguageEnum = z
    .enum(
        LanguageConstant,
        {message: "Invalid Language"},
    );