/**
 * @module Similarity
 * @description Provides functions to sort strings by similarity using Dice coefficient and optional prefix matching.
 */
/**
 * Normalizes a string by removing diacritics and punctuation, and converting to lowercase.
 * @param {string} str - The string to normalize.
 * @returns {string} The normalized string.
 */
declare function normalizeString(str: string): string;
/**
 * Computes the Dice coefficient between two strings.
 * @param {string} s1 - The first string.
 * @param {string} s2 - The second string.
 * @returns {number} The Dice coefficient.
 */
declare function diceCoefficient(s1: string, s2: string): number;
interface SimilarityOptions<T = string> {
    usePrefix?: boolean;
    useFunction?: (item: T) => string;
}
/**
 * Sorts an array of strings by their similarity to a target string.
 * @param {string} target - The target string.
 * @param {string[]} array - The array of strings to sort.
 * @param {SimilarityOptions} [options] - Options for sorting.
 * @param {boolean} [options.usePrefix=false] - Whether to prioritize prefix matches.
 * @returns {string[]} The sorted array of strings.
 */
declare function sortArrayBySimilarity<T = string>(target: string, array: T[], options?: SimilarityOptions<T>): T[];
export { normalizeString, diceCoefficient, sortArrayBySimilarity };
