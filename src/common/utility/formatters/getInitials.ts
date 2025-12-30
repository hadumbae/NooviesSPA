/**
 * Generates an acronym from a given sentence.
 *
 * Takes the first letter of each word and joins them together.
 *
 * @param sentence - The input string from which to create the acronym.
 * @returns A string consisting of the first letters of each word in the sentence.
 *
 * @example
 * ```ts
 * generateAcronym("Portable Network Graphics"); // "PNG"
 * generateAcronym("Hyper Text Markup Language"); // "HTML"
 * ```
 */
export default function getInitials(sentence: string): string {
    return sentence
        .split(" ")       // Split the sentence into words
        .map(word => word[0]) // Take the first letter of each word
        .join("");        // Join letters into a single string
}
