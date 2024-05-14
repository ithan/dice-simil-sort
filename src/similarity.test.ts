import { normalizeString, diceCoefficient, sortArrayBySimilarity, normalizationCache } from './similarity';

describe('normalizeString', () => {
  it('should normalize strings by removing diacritics, punctuation, and converting to lowercase', () => {
    expect(normalizeString('Café')).toBe('cafe');
    expect(normalizeString('Hello, World!')).toBe('hello world');
    expect(normalizeString('Straße')).toBe('strasse');
  });

  it('should return cached result for previously normalized strings', () => {
    normalizeString('Test');
    const spy = jest.spyOn(normalizationCache, 'get');
    normalizeString('Test');
    expect(spy).toHaveBeenCalledWith('Test');
  });
});

describe('diceCoefficient', () => {
  it('should compute the Dice coefficient between two strings', () => {
    expect(diceCoefficient('night', 'nacht')).toBeCloseTo(0.25, 2);
    expect(diceCoefficient('context', 'contact')).toBeCloseTo(0.5, 2);
    expect(diceCoefficient('abc', 'abc')).toBe(1);
    expect(diceCoefficient('abc', 'def')).toBe(0);
  });
});

describe('sortArrayBySimilarity', () => {
  it('should sort array of strings by their similarity to the target string', () => {
    const target = 'hello';
    const array = ['hallo', 'hell', 'hero', 'help'];
    const sortedArray = sortArrayBySimilarity(target, array);
    expect(sortedArray).toEqual(['hell', 'help', 'hallo', 'hero']);
  });

  it('should prioritize prefix matches when usePrefix option is true', () => {
    const target = 'test';
    const array = ['testing', 'attest', 'contest', 'best'];
    const sortedArray = sortArrayBySimilarity(target, array, { usePrefix: true });
    expect(sortedArray).toEqual(['testing', 'attest', 'contest', 'best']);
  });

  it('should use custom function to get string representation of items', () => {
    const target = 'hello';
    const array = [{ name: 'hallo' }, { name: 'hell' }, { name: 'hero' }, { name: 'help' }];
    const sortedArray = sortArrayBySimilarity(target, array, { useFunction: item => item.name });
    expect(sortedArray).toEqual([{ name: 'hell' }, { name: 'help' }, { name: 'hallo' }, { name: 'hero' }]);
  });
});
