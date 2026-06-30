import {EmptyString, EmptyStringSchema} from "@/common/_schemas/strings/EmptyStringSchema.ts";
import {StringValue, StringValueSchema} from "@/common/_schemas/strings/StringValueSchema.ts";
import {TrimmedString, TrimmedStringSchema} from "@/common/_schemas/strings/TrimmedStringSchema.ts";
import {NonEmptyString, NonEmptyStringSchema} from "@/common/_schemas/strings/NonEmptyStringSchema.ts";
import {SlugString, SlugStringSchema} from "@/common/_schemas/strings/SlugString.ts";

export {
    EmptyStringSchema,
    StringValueSchema,
    TrimmedStringSchema,
    NonEmptyStringSchema,
    SlugStringSchema,
}

export type {
    EmptyString,
    StringValue,
    TrimmedString,
    NonEmptyString,
    SlugString,
}
