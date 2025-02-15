import { ValueRequiredError } from 'src/app/errors/value-required.error';
import { UrlVO } from '../../../../src/app/value-objects/url.vo';
import { InvalidUrlError } from 'src/app/errors/invalid-url.error';

describe('UrlVO', () => {
    it('should create a UrlVO for a valid URL', () => {
        const vo = UrlVO.create('https://example.com');
        expect(vo).toBeInstanceOf(UrlVO);
        expect(vo.getValue()).toBe('https://example.com');
    });

    it('should trim whitespace around the URL', () => {
        const vo = UrlVO.create('   https://example.com   ');
        expect(vo.getValue()).toBe('https://example.com');
    });

    it('should throw an error if the URL is not provided', () => {
        expect(() => UrlVO.create(undefined)).toThrow(ValueRequiredError);
    });

    it('should throw an error if the URL is invalid (missing protocol)', () => {
        expect(() => UrlVO.create('example.com')).toThrow(InvalidUrlError);
    });

    it('should throw an error if the URL is invalid (malformed URL)', () => {
        expect(() => UrlVO.create('//invalid-url')).toThrow(InvalidUrlError);
    });

    it('should consider two UrlVOs equal if they have the same value', () => {
        const vo1 = UrlVO.create('https://example.com');
        const vo2 = UrlVO.create('https://example.com');
        expect(vo1.equals(vo2)).toBe(true);
    });

    it('should consider two UrlVOs not equal if they have different values', () => {
        const vo1 = UrlVO.create('https://example.com');
        const vo2 = UrlVO.create('https://another.com');
        expect(vo1.equals(vo2)).toBe(false);
    });
});
