import {EmptyString, EmptyStringSchema} from "@/common/_schemas/strings/simple-strings/EmptyStringSchema";
import {NonEmptyString, NonEmptyStringSchema} from "@/common/_schemas/strings/simple-strings/NonEmptyStringSchema";
import {StringValue, StringValueSchema} from "@/common/_schemas/strings/simple-strings/StringValueSchema";
import {TrimmedString, TrimmedStringSchema} from "@/common/_schemas/strings/simple-strings/TrimmedStringSchema";
import {EmailString, EmailStringSchema} from "@/common/_schemas/strings/simple-strings/EmailStringSchema";
import {URLString, URLStringSchema} from "@/common/_schemas/strings/simple-strings/URLStringSchema";

export {
    StringValueSchema,
    TrimmedStringSchema,
    NonEmptyStringSchema,
    EmptyStringSchema,
    EmailStringSchema,
    URLStringSchema,
}

export type {
    StringValue,
    TrimmedString,
    NonEmptyString,
    EmptyString,
    EmailString,
    URLString,
}


