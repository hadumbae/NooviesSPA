import {FieldValues, Path, PathValue} from "react-hook-form";
import {Key} from "react";

type FormFieldValue<T extends FieldValues> = {
    label: string,
    key: Key,
    value: PathValue<T, Path<T>>
};

export default FormFieldValue;