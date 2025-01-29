import { EnvironmentVO } from '../../../../src/config/value-objects/environment.vo';
import { EnvironmentEnum } from '../../../../src/config/enums/environment.enum';
import { ValueRequiredError } from 'src/common/errors/value-required.error';
import { InvalidEnvironmentError } from 'src/config/errors/invalid-environment.error';

describe('EnvironmentVO', () => {
    it('should create an EnvironmentVO for a valid environment', () => {
        const vo = EnvironmentVO.create(EnvironmentEnum.DEVELOPMENT);
        expect(vo).toBeInstanceOf(EnvironmentVO);
        expect(vo.getValue()).toBe(EnvironmentEnum.DEVELOPMENT);
    });

    it('should trim whitespace around the environment string', () => {
        const vo = EnvironmentVO.create(`   ${EnvironmentEnum.PRODUCTION}   `);
        expect(vo.getValue()).toBe(EnvironmentEnum.PRODUCTION);
    });

    it('should throw an error if the environment is not provided', () => {
        expect(() => EnvironmentVO.create(undefined)).toThrow(
            ValueRequiredError
        );
    });

    it('should throw an error if the environment is invalid', () => {
        expect(() => EnvironmentVO.create('invalid-env')).toThrow(
            InvalidEnvironmentError
        );
    });

    it('should consider two EnvironmentVOs equal if they have the same value', () => {
        const vo1 = EnvironmentVO.create(EnvironmentEnum.TEST);
        const vo2 = EnvironmentVO.create(EnvironmentEnum.TEST);
        expect(vo1.equals(vo2)).toBe(true);
    });

    it('should consider two EnvironmentVOs not equal if they have different values', () => {
        const vo1 = EnvironmentVO.create(EnvironmentEnum.STAGING);
        const vo2 = EnvironmentVO.create(EnvironmentEnum.PRODUCTION);
        expect(vo1.equals(vo2)).toBe(false);
    });
});
