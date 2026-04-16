import {describe, expect, it} from "vitest";
import {GenreSchema} from "@/domains/genres/schema";

describe("GenreSchema", () => {
   describe("valid inputs", () => {
       it("accepts a complete genre", () => {
           const {success} = GenreSchema.safeParse({
               _id: "694c8dfa6fae219589ad0694",
               name: "Dramatic",
               description: "Movies with an utterly dramatic flair.",
               slug: "dramatic-55o4j6",
               movieCount: 49
           });

            expect(success).toBe(true);
       });

       it("accepts a different genre", () => {
           const {success} = GenreSchema.safeParse({
               _id: "694d5dab0065d0d6912f6be6",
               name: "Crime",
               description: "Movies about infamous crimes and criminals.",
               slug: "crime-1x1nf6",
               movieCount: 200
           });

           expect(success).toBe(true);
       });

       describe("invalid or incomplete inputs", () => {
           it("rejects a genre without an _id", () => {
               const {success, error} = GenreSchema.safeParse({
                   name: "Dramatic",
                   description: "Movies with an utterly dramatic flair.",
                   slug: "dramatic-55o4j6",
                   movieCount: 49
               });

               expect(success).toBe(false);
               expect(error?.errors[0].code).toBe("invalid_type");
               expect(error?.errors[0].path[0]).toBe("_id");
           });

           it("rejects a genre with invalid data", () => {
               const {success, error} = GenreSchema.safeParse({
                   _id: "694d5dab0065d0d6912f6be6",
                   name: "C",
                   description: "Movies about infamous crimes and criminals.",
                   slug: "crime-1x1nf6",
                   movieCount: 200
               });

               expect(success).toBe(false);
               expect(error?.errors[0].code).toBe("too_small");
               expect(error?.errors[0].path[0]).toBe("name");
           });
       });
   });
});