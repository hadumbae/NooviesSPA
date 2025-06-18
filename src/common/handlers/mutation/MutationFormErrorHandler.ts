import {ParseError} from "@/common/errors/ParseError.ts";
import {FieldValues, UseFormReturn} from "react-hook-form";

type HandlerParams<TForm extends FieldValues> = {
    form: UseFormReturn<TForm>;
    onError?: (error: Error) => void;
}

export default <TForm extends FieldValues>({form, onError}: HandlerParams<TForm>) => (error: Error) => {
    if (error instanceof ParseError) {
        console.error("Zod Parsing Errors: ", error.errors);

        for (let validationError of error.errors) {
            const {path, message} = validationError;
            form.setError(path.join(".") as any, {type: "manual", message});
        }
    }

    onError && onError(error);
}