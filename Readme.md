# dice-simil-sort

## Overview

`dice-simil-sort` is a JavaScript module designed to sort strings by their similarity using the Dice coefficient and optional prefix matching. It provides functions to normalize strings, compute the Dice coefficient, and sort arrays of strings by their similarity to a target string.

## Features

- **Normalization**: Remove diacritics and punctuation, and convert strings to lowercase.
- **Bigram Generation**: Generate bigrams from a string.
- **Dice Coefficient**: Compute the Dice coefficient between two strings to measure similarity.
- **Sorting by Similarity**: Sort an array of strings by their similarity to a target string, with optional prefix prioritization.
- **Caching**: Caches normalized strings to improve performance.

## Installation

To install `dice-simil-sort`, use npm:

```sh
npm install dice-simil-sort
```

## Example

Here is a complete example of how to use `dice-simil-sort`:

```typescript
import { normalizeString, diceCoefficient, sortArrayBySimilarity } from 'dice-simil-sort';

// Strings
const target = 'example';
const array = ['samples', 'exams', 'temple', 'apple'];

const sortedArray = sortArrayBySimilarity(target, array, { usePrefix: true });
console.log(sortedArray); // ['example', 'exams', 'samples', 'temple']

// Objects
const objectArray = [{ name: 'samples' }, { name: 'exams' }, { name: 'temple' }, { name: 'apple' }];
const sortedObjectArray = sortArrayBySimilarity(target, objectArray, { useFunction: item => item.name });
console.log(sortedObjectArray); // [{ name: 'samples' }, { name: 'exams' }, { name: 'temple' }, { name: 'apple' }]
```


## Usage

### Importing the Module

```typescript
import { normalizeString, diceCoefficient, sortArrayBySimilarity } from 'dice-simil-sort';
```

### Functions

#### `normalizeString`

Normalizes a string by removing diacritics and punctuation, and converting it to lowercase.

```typescript
function normalizeString(str: string): string;
```

**Parameters**:
- `str` (string): The string to normalize.

**Returns**:
- (string): The normalized string.

**Example**:

```typescript
console.log(normalizeString('Café')); // Output: 'cafe'
console.log(normalizeString('Straße')); // Output: 'strasse'
```

#### `diceCoefficient`

Computes the Dice coefficient between two strings.

```typescript
function diceCoefficient(s1: string, s2: string): number;
```

**Parameters**:
- `s1` (string): The first string.
- `s2` (string): The second string.

**Returns**:
- (number): The Dice coefficient.

**Example**:

```typescript
console.log(diceCoefficient('night', 'nacht')); // Output: 0.25
console.log(diceCoefficient('context', 'contact')); // Output: 0.5
```

#### `sortArrayBySimilarity`

Sorts an array of strings by their similarity to a target string.

```typescript
function sortArrayBySimilarity<T = string>(
  target: string,
  array: T[],
  options: SimilarityOptions<T> = {}
): T[];
```

**Parameters**:
- `target` (string): The target string.
- `array` (T[]): The array of strings to sort.
- `options` (SimilarityOptions<T>): Options for sorting.

**Options**:
- `usePrefix` (boolean): Whether to prioritize prefix matches. Default is `false`.
- `useFunction` ((item: T) => string): Function to extract string representation from array items. Default is `(item: any) => String(item)`.

**Returns**:
- (T[]): The sorted array of strings.

**Example**:

```typescript
const target = 'hello';
const array = ['hallo', 'hell', 'hero', 'help'];
const sortedArray = sortArrayBySimilarity(target, array);
console.log(sortedArray); // Output: ['hell', 'help', 'hallo', 'hero']
```

### `useFunction` Option

The `useFunction` option allows you to specify a custom function to extract the string representation from complex objects in the array. This is useful when you need to sort an array of objects based on a specific property.

**Example**:

```typescript
const target = 'hello';
const array = [{ name: 'hallo' }, { name: 'hell' }, { name: 'hero' }, { name: 'help' }];
const sortedArray = sortArrayBySimilarity(target, array, { useFunction: item => item.name });
console.log(sortedArray); // Output: [{ name: 'hell' }, { name: 'help' }, { name: 'hallo' }, { name: 'hero' }]
```

### Caching

The `normalizeString` function uses a caching mechanism to store previously normalized strings. This improves performance by avoiding redundant normalization operations for the same input strings.

## How It Works

### Normalization

Normalization involves converting a string to a standard form by:
- Removing diacritics (e.g., converting "Café" to "Cafe").
- Removing punctuation (e.g., converting "Hello, World!" to "Hello World").
- Converting to lowercase for case-insensitive comparison (e.g., converting "Straße" to "strasse").

### Dice Coefficient

The Dice coefficient is a measure of similarity between two strings. It ranges from 0 (no similarity) to 1 (exact match). It is calculated using bigrams (pairs of consecutive characters) from both strings and finding the ratio of matching bigrams to the total number of bigrams.

### Prefix Matching Priority

When the `usePrefix` option is set to `true`, strings that start with the target string are given higher priority in the sorting order. This is useful when prefix matches are considered more relevant.

**Example**:

```typescript
const target = 'test';
const array = ['testing', 'attest', 'contest', 'best'];
const sortedArray = sortArrayBySimilarity(target, array, { usePrefix: true });
console.log(sortedArray); // Output: ['testing', 'attest', 'contest', 'best']
```

## FAQ

### Does it work with uppercase and lowercase text?

Yes, the `normalizeString` function converts all text to lowercase to ensure case-insensitive comparison.

### How does caching work?

The `normalizeString` function caches previously normalized strings to avoid redundant computations. This is done using a JavaScript `Map` object.

### Can I use this library with objects?

Yes, you can use the `useFunction` option to provide a custom function that extracts the string representation from objects.

### How do I install this library?

You can install `dice-simil-sort` using npm:

```sh
npm install dice-simil-sort
```



## License

This project is licensed under the MIT License.
