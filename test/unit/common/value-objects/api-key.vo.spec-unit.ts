import { InvalidApiKeyError } from 'src/common/errors/invalid-api-key.error';
import { ApiKeyVO } from '../../../../src/common/value-objects/api-key.vo';

describe('ApiKeyVO', () => {

  const VALID_64_CHAR_KEY = 'a'.repeat(64); // a string of length 64
  const VALID_LONG_KEY = 'b'.repeat(100);   // a string of length 100

  it('should create an ApiKeyVO for a valid API key of length 64', () => {
    const vo = ApiKeyVO.create(VALID_64_CHAR_KEY);
    expect(vo).toBeInstanceOf(ApiKeyVO);
    expect(vo.getValue()).toBe(VALID_64_CHAR_KEY);
  });

  it('should create an ApiKeyVO for a valid API key longer than 64 chars', () => {
    const vo = ApiKeyVO.create(VALID_LONG_KEY);
    expect(vo).toBeInstanceOf(ApiKeyVO);
    expect(vo.getValue()).toBe(VALID_LONG_KEY);
  });

  it('should trim whitespace around the API key', () => {
    const vo = ApiKeyVO.create(`   ${VALID_64_CHAR_KEY}   `);
    expect(vo.getValue()).toBe(VALID_64_CHAR_KEY);
  });

  it('should throw an error if the API key is empty', () => {
    expect(() => ApiKeyVO.create('')).toThrow(InvalidApiKeyError);
  });

  it('should throw an error if the API key is only whitespace', () => {
    expect(() => ApiKeyVO.create('    ')).toThrow(InvalidApiKeyError);
  });

  it('should throw an error if the API key is shorter than 64 chars', () => {
    const shortKey = 'short'; // length 5
    expect(() => ApiKeyVO.create(shortKey)).toThrow(InvalidApiKeyError);
  });

  it('should consider two ApiKeyVOs equal if they have the same value', () => {
    const vo1 = ApiKeyVO.create(VALID_64_CHAR_KEY);
    const vo2 = ApiKeyVO.create(VALID_64_CHAR_KEY);
    expect(vo1.equals(vo2)).toBe(true);
  });

  it('should consider two ApiKeyVOs not equal if they have different values', () => {
    const vo1 = ApiKeyVO.create(VALID_64_CHAR_KEY);
    const vo2 = ApiKeyVO.create(VALID_LONG_KEY);
    expect(vo1.equals(vo2)).toBe(false);
  });
});
