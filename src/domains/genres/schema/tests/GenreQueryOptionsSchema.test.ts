import {describe, it, expect} from "vitest";
import {GenreQueryOptionSchema} from "@/domains/genres/schema/filters/GenreQueryOptionsSchema.ts";

describe("GenreQueryOptionsSchema", () => {
    describe("Valid query options for schema", () => {
        it("accepts empty data", () => {
            const {success, data} = GenreQueryOptionSchema.safeParse({});

            expect(success).toBe(true);
            expect(data).toEqual({});
        });

        it("accepts empty strings as data", () => {
            const {success, data} = GenreQueryOptionSchema.safeParse({
                name: "",
                sortByName: "",
            });

            expect(success).toBe(true);
            expect(data).toEqual({name: undefined, sortByName: undefined});
        });

        it("accepts valid data", () => {
            const {success, data} = GenreQueryOptionSchema.safeParse({
                name: "Drama",
                sortByName: "-1",
            });

            expect(success).toBe(true);
            expect(data).toEqual({name: "Drama", sortByName: -1});
        });
    });

    describe("Invalid query options for schema", () => {
        it("rejects null as data", () => {
            const {success, error} = GenreQueryOptionSchema.safeParse({
                name: null,
                sortByName: null,
            });

            expect(success).toBe(false);
            expect(error?.errors[0].path[0]).toBe("name");
            expect(error?.errors[0].code).toBe("invalid_type");
            expect(error?.errors[1].path[0]).toBe("sortByName");
            expect(error?.errors[1].code).toBe("invalid_union");
        });

        it("rejects null as data", () => {
            const {success, error} = GenreQueryOptionSchema.safeParse({
                name: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
                sortByName: -1,
            });

            expect(success).toBe(false);
            expect(error?.errors[0].path[0]).toBe("name");
            expect(error?.errors[0].code).toBe("too_big");
        });
    });
})