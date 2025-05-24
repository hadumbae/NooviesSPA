/**
 * Converts a given string to title case.
 *
 * Each word in the input string will have its first character capitalized
 * and the rest of the characters in lowercase.
 *
 * @param text - The input string to convert.
 * @returns A new string with each word in title case.
 *
 * @example
 * ```ts
 * convertToTitleCase("the lord of the rings"); // "The Lord Of The Rings"
 * convertToTitleCase("HELLO world"); // "Hello World"
 * ```
 */
export default function convertToTitleCase(text: string) {
    return text
        .toLowerCase()
        .split(' ')
        .map((word: string) => (word.charAt(0).toUpperCase() + word.slice(1)))
        .join(' ');
}