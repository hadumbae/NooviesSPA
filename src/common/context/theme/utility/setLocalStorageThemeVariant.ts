import { ThemeVariant, ThemeVariantEnumSchema } from "@/common/schema/enums/ThemeVariantEnumSchema.ts";
import buildStandardLog from "@/common/utility/features/logger/buildStandardLog.ts";

export default function setLocalStorageThemeVariant(variant: ThemeVariant): ThemeVariant {
    const { success, data } = ThemeVariantEnumSchema.safeParse(variant);
    const storeValue: ThemeVariant = success ? data : "light";

    if (!success) {
        buildStandardLog({
            level: "warn",
            type: "WARNING",
            msg: "Invalid theme variant provided.",
            context: { variant },
        });
    }

    localStorage.removeItem('themeVariant');
    localStorage.setItem('themeVariant', storeValue);

    return storeValue;
}
