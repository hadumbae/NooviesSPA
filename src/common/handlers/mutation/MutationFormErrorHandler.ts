import {ParseError} from "@/common/errors/ParseError.ts";
import {FieldValues, UseFormReturn} from "react-hook-form";

export default <T extends FieldValues>({form}: {form: UseFormReturn<T>}) => (error: Error) => {
    if (error instanceof ParseError) {
        console.error("Zod Parsing Errors: ", error.errors);

        for (let validationError of error.errors) {
            const {path, message} = validationError;
            form.setError(path.join(".") as any, {type: "manual", message});
        }
    }
}