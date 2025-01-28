import { LanguageVO } from '../../../../src/common/value-objects/language.vo';
import { LanguageEnum } from '../../../../src/common/enums/language.enum';
import { ValueRequiredError } from 'src/common/errors/value-required.error';
import { InvalidLanguageError } from 'src/common/errors/invalid-language.error';

describe('LanguageVO', () => {
    it('should create a LanguageVO for a valid language', () => {
        const vo = LanguageVO.create(LanguageEnum.EN_US);
        expect(vo).toBeInstanceOf(LanguageVO);
        expect(vo.getValue()).toBe(LanguageEnum.EN_US);
    });

    it('should trim whitespace around the language string', () => {
        const vo = LanguageVO.create(`   ${LanguageEnum.ES_LA}   `);
        expect(vo.getValue()).toBe(LanguageEnum.ES_LA);
    });

    it('should throw an error if the language is not provided', () => {
        expect(() => LanguageVO.create(undefined)).toThrow(
            ValueRequiredError
        );
    });

    it('should throw an error if the language is invalid', () => {
        expect(() => LanguageVO.create('invalid-lang')).toThrow(
            InvalidLanguageError
        );
    });

    it('should consider two LanguageVOs equal if they have the same value', () => {
        const vo1 = LanguageVO.create(LanguageEnum.EN_US);
        const vo2 = LanguageVO.create(LanguageEnum.EN_US);
        expect(vo1.equals(vo2)).toBe(true);
    });

    it('should consider two LanguageVOs not equal if they have different values', () => {
        const vo1 = LanguageVO.create(LanguageEnum.EN_US);
        const vo2 = LanguageVO.create(LanguageEnum.ES_LA);
        expect(vo1.equals(vo2)).toBe(false);
    });
});
