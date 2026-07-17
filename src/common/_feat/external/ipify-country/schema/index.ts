import {
    IpifyLocalStorageData,
    IpifyLocalStorageSchema
} from "@/common/_feat/external/ipify-country/schema/IpifyLocalStorageSchema.ts";
import {IpifyPayloadData, IpifyPayloadSchema} from "@/common/_feat/external/ipify-country/schema/IpifyPayloadSchema.ts";
import {IpifyLocation, IpifyLocationSchema} from "@/common/_feat/external/ipify-country/schema/IpifyLocationSchema.ts";

export {
    IpifyLocationSchema,
    IpifyPayloadSchema,
    IpifyLocalStorageSchema,
}

export type {
    IpifyLocation,
    IpifyPayloadData,
    IpifyLocalStorageData,
}

