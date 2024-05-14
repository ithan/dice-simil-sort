"use strict";
/**
 * @module Similarity
 * @description Provides functions to sort strings by similarity using Dice coefficient and optional prefix matching.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArrayBySimilarity = exports.diceCoefficient = exports.normalizeString = exports.normalizationCache = void 0;
const normalizationCache = new Map();
exports.normalizationCache = normalizationCache;
/**
 * Normalizes a string by removing diacritics and punctuation, and converting to lowercase.
 * @param {string} str - The string to normalize.
 * @returns {string} The normalized string.
 */
function normalizeString(str) {
    const cached = normalizationCache.get(str);
    if (cached) {
        return cached;
    }
    const normalized = str
        .replace(/ß/g, 'ss') // Replace "ß" with "ss" first
        .normalize('NFD') // Normalize to decomposed form
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^\w\s]/gi, '') // Remove punctuation
        .toLowerCase(); // Convert to lowercase for case-insensitive comparison
    normalizationCache.set(str, normalized);
    return normalized;
}
exports.normalizeString = normalizeString;
/**
 * Generates bigrams from a string.
 * @param {string} str - The input string.
 * @returns {Set<string>} A set of bigrams.
 */
function getBigrams(str) {
    const bigrams = new Set();
    for (let i = 0; i < str.length - 1; i++) {
        bigrams.add(str.slice(i, i + 2));
    }
    return bigrams;
}
/**
 * Computes the Dice coefficient between two strings.
 * @param {string} s1 - The first string.
 * @param {string} s2 - The second string.
 * @returns {number} The Dice coefficient.
 */
function diceCoefficient(s1, s2) {
    const bigrams1 = getBigrams(s1);
    const bigrams2 = getBigrams(s2);
    let intersectionSize = 0;
    bigrams1.forEach(bigram => {
        if (bigrams2.has(bigram)) {
            intersectionSize++;
        }
    });
    return (2 * intersectionSize) / (bigrams1.size + bigrams2.size);
}
exports.diceCoefficient = diceCoefficient;
/**
 * Sorts an array of strings by their similarity to a target string.
 * @param {string} target - The target string.
 * @param {string[]} array - The array of strings to sort.
 * @param {SimilarityOptions} [options] - Options for sorting.
 * @param {boolean} [options.usePrefix=false] - Whether to prioritize prefix matches.
 * @returns {string[]} The sorted array of strings.
 */
function sortArrayBySimilarity(target, array, options = {}) {
    const { usePrefix = false, useFunction = (item) => String(item) } = options;
    const normalizedTarget = normalizeString(target);
    array.sort((itemA, itemB) => {
        const a = useFunction(itemA);
        const b = useFunction(itemB);
        const normalizedA = normalizeString(a);
        const normalizedB = normalizeString(b);
        const similarityA = diceCoefficient(normalizedTarget, normalizedA);
        const similarityB = diceCoefficient(normalizedTarget, normalizedB);
        const isPrefixA = usePrefix && normalizedA.startsWith(normalizedTarget);
        const isPrefixB = usePrefix && normalizedB.startsWith(normalizedTarget);
        if (isPrefixA && !isPrefixB)
            return -1;
        if (!isPrefixA && isPrefixB)
            return 1;
        return similarityB - similarityA;
    });
    return array;
}
exports.sortArrayBySimilarity = sortArrayBySimilarity;
